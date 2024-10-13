import Adw from "gi://Adw";
import GObject from "gi://GObject";
import Gtk from "gi://Gtk";
import Gio from "gi://Gio";
import {
    ExtensionPreferences,
    gettext as _,
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class About extends Adw.PreferencesPage {

    static {
        GObject.registerClass(this);
    }

    _stack: Gtk.Stack;
    _main_page: Gtk.Box;

    constructor(window: ExtensionPreferences) {
        super({
            title: _("About"),
            icon_name: "clear-day",
        });

        const extensionIconName = "clear-day";
        const extensionName = window.metadata.name;
        const ownerName = window.metadata.owner;
        const extensionsVersion = window.metadata.version;
        const copyrihtYear = "2024";
        const copyright = `© ${copyrihtYear} ${ownerName}`;

        const mainGroup = new Adw.PreferencesGroup();
        this.add(mainGroup);

        const mainActionRow = new Adw.ActionRow();
        mainGroup.add(mainActionRow);

        this._stack = new Gtk.Stack({
            "transition-type": Gtk.StackTransitionType.SLIDE_LEFT_RIGHT,
            "transition-duration": 200,
            "vexpand": true,
        });
        mainActionRow.set_child(this._stack);

        this._main_page = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            margin_start: 12,
            margin_end: 12,
            margin_bottom: 12,
            spacing: 6,
        });
        this._stack.add_named(this._main_page, "page_main");

        const extensionIconImage = new Gtk.Image({
            icon_name: extensionIconName,
            pixel_size: 128,
            margin_top: 12,
            margin_bottom: 12,
            css_classes: ["icon-dropshadow"],
        });
        this._main_page.append(extensionIconImage);

        this._main_page.append(new Gtk.Label({
            wrap: true,
            justify: Gtk.Justification.CENTER,
            css_classes: ["title-1"],
            label: extensionName,
        }));
        this._main_page.append(new Gtk.Label({
            wrap: true,
            margin_top: 4,
            margin_bottom: 4,
            justify: Gtk.Justification.CENTER,
            css_classes: ["title-5"],
            label: copyright,
        }));
        const versionButton = new Gtk.Button({
            margin_top: 4,
            margin_bottom: 12,
            halign: Gtk.Align.CENTER,
            css_classes: ["success"],
        });
        versionButton.set_child(new Gtk.Label({
            label: `${extensionsVersion}`,
        }));
        this._main_page.append(versionButton);

        const secondGroup = new Adw.PreferencesGroup({
            margin_top: 6
        });
        this._main_page.append(secondGroup);

        secondGroup.add(this._link("translate-symbolic", _("Translations by:"), ""));
        this._setContactGroup();
        this._setContactPage();
    }

    _setContactGroup(){
        const contactGroup = new Adw.PreferencesGroup({
            margin_top: 6
        });
        this._main_page.append(contactGroup);

        const actionRow = new Adw.ActionRow({
            title: _("Contact"),
            activatable: true,
            tooltip_text: _("Contact the extension owner"),
        });
        contactGroup.add(actionRow);
        actionRow.add_prefix(new Gtk.Image({
            icon_name: "contact-symbolic",
            pixel_size: 18,
        }));
        actionRow.add_suffix(new Gtk.Image({
            icon_name: "go-next-symbolic",
            valign: Gtk.Align.CENTER,
            pixel_size: 18,
        }));
        actionRow.connect('activated', () => {
            this._stack.set_visible_child_name("page_contact");
        });
    }

    _setContactPage(){
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            margin_start: 12,
            margin_end: 12,
            margin_bottom: 12,
            spacing: 6,
        });
        this._stack.add_named(vbox, "page_contact");
        const backButton = new Gtk.Button({
            halign: Gtk.Align.START,
            css_classes: ["flat"],
        });
        vbox.append(backButton);
        backButton.set_child(new Gtk.Image({
            icon_name: "go-previous-symbolic",
        }));
        backButton.connect('clicked', () => {
            this._stack.set_visible_child_name("page_main");
        });
        const secondGroup = new Adw.PreferencesGroup({
            margin_top: 6
        });
        vbox.append(secondGroup);

        secondGroup.add(this._link("web-symbolic", _("atareao.es"), "https://atareao.es"));
        secondGroup.add(this._link("x-twitter-symbolic", _("Twitter"), "https://twitter.com/atareao"));
        secondGroup.add(this._link("linkedin-symbolic", _("Linkedin"), "https://www.linkedin.com/company/atareao"));
        secondGroup.add(this._link("youtube-symbolic", _("Youtube"), "https://www.youtube.com/@atareao"));
        secondGroup.add(this._link("github-symbolic", _("GitHub"), "https://github.com/atareao"));
        secondGroup.add(this._link("telegram-symbolic", _("Telegram"), "https://t.me/atareao_con_linux"));
        secondGroup.add(this._link("mastodon-symbolic", _("Mastodon"), "https://mastodon.social/atareao"));
        secondGroup.add(this._link("email-symbolic", _("Contact"), "https://atareao.es/contactar"));
    }

    _link(icon_name: string, label: string, link: string){
        const actionRow = new Adw.ActionRow({
            title: label,
            activatable: true,
            tooltip_text: link,
        });

        actionRow.add_prefix(new Gtk.Image({
            icon_name: icon_name,
            pixel_size: 18,
        }));
        actionRow.add_suffix(new Gtk.Image({
            icon_name: "adw-external-link-symbolic",
            valign: Gtk.Align.CENTER,
            pixel_size: 18,
        }));
        actionRow.connect('activated', () => {
            Gio.AppInfo.launch_default_for_uri_async(link, null, null, null);
        });
        return actionRow;
    }
}

