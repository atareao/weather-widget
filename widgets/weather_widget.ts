import GObject from 'gi://GObject';
import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import St from 'gi://St';
import Mtk from 'gi://Mtk';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as DND from 'resource:///org/gnome/shell/ui/dnd.js';
import OpenMeteo from './openmeteo.js';
import * as ICONS from './icons.js';

export function getCurrentPath(){
    let stack = (new Error()).stack;
    if(stack){
        let stackLines = stack.split('\n');
        let callerLine = stackLines[1];
        let index = callerLine.indexOf('@file:///');
        let cleanPath = callerLine.slice(index + 8, callerLine.length);
        return cleanPath.slice(0, cleanPath.lastIndexOf('/')) + '/';
    }
    return undefined;
}

export default class WeatherWidget extends St.BoxLayout {

    static {
        GObject.registerClass(this);
    }

    private _settings: Gio.Settings;
    private _width = 200;
    private _height = 200;
    private _path = getCurrentPath();
    private _openMeteo: OpenMeteo;
    private _connections: number[];
    private _settings_connections: number[];
    private _updateId: number;
    private _ignorePositionUpdate: boolean;
    private _draggable: any;
    private _dragMonitor: any;
    private deltaX: number = 0;
    private deltaY: number = 0;
    private oldX: number = 0;
    private oldY: number = 0;
    private startX: number = 0;
    private startY: number = 0;
    private rowHeight: number = 0;
    private rowWidth: number = 0;
    private dragBeginId: number = 0;
    private dragEndId: number = 0;
    private _weatherIcon: Clutter.Actor | null;
    private _temperature: St.Label | null;

    constructor(settings: Gio.Settings) {
        super({
            style_class: 'weather-widget',
            vertical: true,
            reactive: true,
            track_hover: true,
            can_focus: true,
        });

        this._settings = settings;
        this._ignorePositionUpdate = false;
        this._makeDraggable();
        this.setPosition();

        const latitude: string = this._settings.get_value("latitude").deep_unpack();
        const longitude: string = this._settings.get_value("longitude").deep_unpack();
        this._weatherIcon = null;
        this._temperature = null;
        this._openMeteo = new OpenMeteo(latitude, longitude, "celsius", "kmh", "mm");
        this._openMeteo.update();

        this._updateId = 0;

        this._connections = [];
        this._connections.push(this.connect('destroy', () => this._clearTimeout()));
        this._connections.push(this.connect('notify::visible', () => this._sync()));
        this._settings_connections = [];
        this._settings_connections.push(this._settings.connect(`changed::position`, () => this.setPosition()));
        this._settings_connections.push(this._settings.connect(`changed::visible`, () => this._sync()));
        this._settings_connections.push(this._settings.connect(`changed::updatetime`, () => this._sync()));
        this._settings_connections.push(this._settings.connect(`changed::longitude`, () => {
            const longitude: string = this._settings.get_value("longitude").deep_unpack();
            this._openMeteo = new OpenMeteo(latitude, longitude, "celsius", "kmh", "mm");
            this._sync();
        }));
        this._settings_connections.push(this._settings.connect(`changed::latitude`, () => {
            const latitude: string = this._settings.get_value("latitude").deep_unpack();
            this._openMeteo = new OpenMeteo(latitude, longitude, "celsius", "kmh", "mm");
            this._sync();
        }));
        this._sync();
    }

    _ensureTimeout() {
        if (this._updateId > 0){
            return;
        }
        const updateTime:number = this._settings.get_value(`updatetime`).deep_unpack();

        this._updateId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, updateTime,
            () => {
                this._update();
                return GLib.SOURCE_CONTINUE;
            });
    }

    _clearTimeout() {
        if (this._updateId > 0){
            GLib.source_remove(this._updateId);
        }
        this._updateId = 0;
    }

    _sync() {
        if (this.visible){
            this._ensureTimeout();
            this._update();
        }else{
            this._clearTimeout();
        }
    }

    _update() {
        this.destroy_all_children();
        this._openMeteo.update();
        const data = this._openMeteo.get_data();
        const isDay = data.current.is_day;
        const weatherCode = data.current.weather_code;
        if (isDay == 1){
            this._weatherIcon = St.TextureCache.get_default().load_file_async(
                Gio.File.new_for_path(`${this._path}../assets/${ICONS.get_icon(weatherCode).day}`), this._width, this._height, 1, 1);
        }else{
            this._weatherIcon = St.TextureCache.get_default().load_file_async(
                Gio.File.new_for_path(`${this._path}../assets/${ICONS.get_icon(weatherCode).night}`), this._width, this._height, 1, 1);
        }
        this.add_child(this._weatherIcon);
        this._temperature = new St.Label({
            text: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
            style_class: 'temperature'
        });
        this.add_child(this._temperature);
    }

    _getMetaRectForCoords(x: number, y: number){
        this.get_allocation_box();
        let rect = new Mtk.Rectangle();

        [rect.x, rect.y] = [x, y];
        [rect.width, rect.height] = this.get_transformed_size();
        return rect;
    }

    _getWorkAreaForRect(rect: any){
        let monitorIndex = global.display.get_monitor_index_for_rect(rect);
        return Main.layoutManager.getWorkAreaForMonitor(monitorIndex);
    }

    _isOnScreen(x: number, y: number){
        let rect = this._getMetaRectForCoords(x, y);
        let monitorWorkArea = this._getWorkAreaForRect(rect);

        return monitorWorkArea.contains_rect(rect);
    }

    _keepOnScreen(x: number, y:number){
        let rect = this._getMetaRectForCoords(x, y);
        let monitorWorkArea = this._getWorkAreaForRect(rect);

        let monitorRight = monitorWorkArea.x + monitorWorkArea.width;
        let monitorBottom = monitorWorkArea.y + monitorWorkArea.height;

        x = Math.min(Math.max(monitorWorkArea.x, x), monitorRight - rect.width);
        y = Math.min(Math.max(monitorWorkArea.y, y), monitorBottom - rect.height);

        return [x, y];
    }

    setPosition(){
        if(this._ignorePositionUpdate){
            return;
        }
        let [x, y]: [number, number] = this._settings.get_value(`position`).deep_unpack();
        this.set_position(x, y);

        if(!this.get_parent())
            return;

        if(!this._isOnScreen(x, y)){
            [x, y] = this._keepOnScreen(x, y);


            this.ease({
                x,
                y,
                duration: 150,
                mode: Clutter.AnimationMode.EASE_OUT_QUAD
            });
            this._ignorePositionUpdate = true;
            this._settings.set_value('position', new GLib.Variant('(ii)', [x, y]));
            this._ignorePositionUpdate = false;
        }
    }

    _makeDraggable(){
        this._draggable = DND.makeDraggable(this, {});
        this._draggable._animateDragEnd = (eventTime: any) => {
            this._draggable._animationInProgress = true;
            this._draggable._onAnimationComplete(this._draggable._dragActor, eventTime);
        };
        this.dragBeginId = this._draggable.connect('drag-begin', this._onDragBegin.bind(this));
        this.dragEndId = this._draggable.connect('drag-end', this._onDragEnd.bind(this));
    }

    _onDragBegin() {
        this._dragMonitor = {
            dragMotion: this._onDragMotion.bind(this)
        };
        DND.addDragMonitor(this._dragMonitor);

        let p = this.get_transformed_position();
        this.startX = this.oldX = p[0];
        this.startY = this.oldY = p[1];

        this.get_allocation_box();
        this.rowHeight = this.height;
        this.rowWidth = this.width;
    }

    _onDragMotion(dragEvent: any) {
        this.deltaX = dragEvent.x - ( dragEvent.x - this.oldX );
        this.deltaY = dragEvent.y - ( dragEvent.y - this.oldY );

        let p = this.get_transformed_position();
        this.oldX = p[0];
        this.oldY = p[1];

        return DND.DragMotionResult.CONTINUE;
    }

    _onDragEnd() {
        if (this._dragMonitor) {
            DND.removeDragMonitor(this._dragMonitor);
            this._dragMonitor = null;
        }
        console.log(`dragged ${this.deltaX}, ${this.deltaY}`);
        this._settings.set_value(`position`,
            new GLib.Variant('(ii)', [this.deltaX, this.deltaY]));
    }

    getDragActorSource() {
        return this;
    }

    destroy(){
        this.destroy_all_children();
        this._onDragEnd();
        this._clearTimeout();
        this._connections.forEach(connection => {
            this.disconnect(connection);
        });
        this._settings_connections.forEach(connection => {
            this._settings.disconnect(connection);
        });
        super.destroy();
    }
}
