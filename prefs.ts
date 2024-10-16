import Gtk from 'gi://Gtk';
import GObject from "gi://GObject";
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import About from './about.js';

interface WindowSettingRegistry {
    _settings: Gio.Settings
}

class WidgetRow extends GObject.Object {
    static [GObject.properties] = {
        'key': GObject.ParamSpec.string(
            'key', '', '',
            GObject.ParamFlags.READWRITE,
            ''),
        'value': GObject.ParamSpec.string(
            'value', '', '',
            GObject.ParamFlags.READWRITE,
            ''),
    };
    static {
        GObject.registerClass(this);
    }

    _key: string;
    _value: string;

    constructor(key: string, value: string) {
        super();
        this._key = key;
        this._value = value;
    }
    get key() {
        if (this._key === undefined) {
            this._key = '';
        }
        return this._key;
    }
    set key(key_value) {
        if (this._key === key_value) {
            return;
        }
        this._key = key_value;
        this.notify('key');
    }
    get value() {
        if (this._value === undefined) {
            this._value = '';
        }
        return this._value;
    }
    set value(value_value) {
        if (this._value === value_value) {
            return;
        }
        this._value = value_value;
        this.notify('value');
    }
}

export default class WeatherWidgetPreferences extends ExtensionPreferences {

  override async fillPreferencesWindow(window: Adw.PreferencesWindow & WindowSettingRegistry): Promise<void> {
    window._settings = this.getSettings();

    const iconTheme = Gtk.IconTheme.get_for_display(window.get_display());
    const iconsDirectory = this.dir.get_child('icons').get_path();
    console.log(`Adding ${iconsDirectory} to the icon theme search path`);
    if(iconsDirectory != null){
        iconTheme.add_search_path(iconsDirectory);
    }
    this.buildPageGneral(window);
    window.add(new About(this));
  }

  buildPageGneral(window: Adw.PreferencesWindow & WindowSettingRegistry) {
    const page = new Adw.PreferencesPage({
        title: _("General"),
        icon_name: "dialog-information-symbolic",
    });
    window.add(page);

    const group = new Adw.PreferencesGroup({
        title: _("Appearance"),
        description: _("Configure the appearance of the extension"),
    });
    page.add(group);

    const latitude = new Adw.EntryRow({
        title: _("Latitude"),
    });
    group.add(latitude);
    const longitude = new Adw.EntryRow({
        title: _("Longitude"),
    });
    group.add(longitude);

    window._settings.bind('latitude', latitude, 'text', Gio.SettingsBindFlags.DEFAULT);
    window._settings.bind('longitude', longitude, 'text', Gio.SettingsBindFlags.DEFAULT);
  }
}
