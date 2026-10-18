export function isNativeApp() {
  return typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.() === true;
}

export async function initNativeApp() {
  if (!isNativeApp()) return;

  document.documentElement.classList.add('capacitor-native');

  try {
    const { ensureNotificationChannel, ensureLocalNotificationPermission, setupNativeNotificationListeners } =
      await import('./utils/nativeNotificationHelper.js');
    const { requestNativeNotificationSync } = await import('./utils/muzakkirNotificationSync.js');

    await ensureNotificationChannel();
    await ensureLocalNotificationPermission();
    setupNativeNotificationListeners(requestNativeNotificationSync);

    const { Capacitor } = await import('@capacitor/core');
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    const { SplashScreen } = await import('@capacitor/splash-screen');
    const { Keyboard } = await import('@capacitor/keyboard');
    const { App } = await import('@capacitor/app');

    await StatusBar.setStyle({ style: Style.Dark });
    if (Capacitor.getPlatform() === 'ios') {
      await StatusBar.setOverlaysWebView({ overlay: true });
    } else if (Capacitor.getPlatform() === 'android') {
      await StatusBar.setBackgroundColor({ color: '#1b4332' });
    }
    await SplashScreen.hide();

    if (Keyboard.setResizeMode) {
      await Keyboard.setResizeMode({ mode: 'body' });
    }

    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.minimizeApp();
      }
    });

    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        requestNativeNotificationSync();
      }
    });

    requestNativeNotificationSync();
  } catch (err) {
    console.warn('Native init:', err);
  }
}
