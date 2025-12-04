function install(data, reason) {}

async function startup({ id, version, resourceURI, rootURI }, reason) {
  Zotero.PreferencePanes.register({
    pluginID: "test@northword.cn",
    src: `${rootURI}content/preferences.xhtml`,
    label: "Test Plugin",
    image: `${rootURI}/content/icons/favicon.png`,
  });
}

async function onMainWindowLoad({ window }, reason) {}

async function onMainWindowUnload({ window }, reason) {}

async function shutdown({ id, version, resourceURI, rootURI }, reason) {
  if (reason === APP_SHUTDOWN) {
    return;
  }

  await showPrefs();
}

function uninstall(data, reason) {}

async function showPrefs() {
  var { AddonManager } = ChromeUtils.importESModule(
    "resource://gre/modules/AddonManager.sys.mjs"
  );
  const addon = await AddonManager.getAddonByID("test@northword.cn");

  var branch = Services.prefs.getDefaultBranch("");
  var obj = {
    pref(pref, _value) {
      Zotero.debug(
        `${pref} hasDefaultValue: ${_value}, userValue: ${Zotero.Prefs.get(
          pref,
          true
        )}, prefHasUserValue: ${branch.prefHasUserValue(pref)}`
      );

      if (!branch.prefHasUserValue(pref)) {
        // 	branch.deleteBranch(pref);
        Zotero.debug(`clearing ${pref}`);
      }
    },
  };
  try {
    Services.scriptloader.loadSubScript(
      addon.getResourceURI("prefs.js").spec,
      obj
    );
  } catch (e) {
    Zotero.debug(e);
    if (!e.toString().startsWith("Error opening input stream")) {
      Zotero.logError(e);
    }
  }
}
