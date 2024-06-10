const GETTEXT_DOMAIN = 'my-indicator-extension';

const { GObject, St } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const _ = ExtensionUtils.gettext;

const Indicator = GObject.registerClass(
  class Indicator extends PanelMenu.Button {
    _init() {
      super._init(0.0, _('BarDuck'));

      let icon = new St.Icon({
        style_class: 'duck_close',
        width: 20
      });
      this.add_child(icon);

      this.connect('button-press-event', () => {
        icon.style_class = 'duck_open';
      });

      this.connect('button-release-event', () => {
        icon.style_class = 'duck_close';
      });
    }
  });

class Extension {
  constructor(uuid) {
    this._uuid = uuid;

    ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
  }

  enable() {
    this._indicator = new Indicator();
    Main.panel.addToStatusArea(this._uuid, this._indicator, 1, "center");
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}

function init(meta) {
  return new Extension(meta.uuid);
}
