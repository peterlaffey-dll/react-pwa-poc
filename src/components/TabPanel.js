import React from 'react';

const TabPanel = () => {
  const onEnableNotifications = () => {
    Notification.requestPermission((result) => {
      console.log('User choice: ', result);
      if (result !== 'granted') {
        console.log('No  notification permission granted!');
      } else {
        console.log('configure push...');
        //configurePushSub();
      }
    });
  };

  const displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
      const options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: '/src/images/icons/app-icon-96x96.png',
        image: '/src/images/sf-boat.jpg',
        dir: 'ltr',
        lang: 'en-US', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/src/images/icons/app-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: true,
        actions: [
          {
            action: 'confirm',
            title: 'Okay',
            icon: '/src/images/icons/app-icon-96x96.png',
          },
          {
            action: 'cancel',
            title: 'Cancel',
            icon: '/src/images/icons/app-icon-96x96.png',
          },
        ],
      };

      navigator.serviceWorker.ready.then(function (swreg) {
        swreg.showNotification('Successfully subscribed!', options);
      });
    }
  };

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // const configurePushSub = () => {
  //   console.log('are we here??');
  //   if (!('serviceWorker' in navigator)) {
  //     return;
  //   }

  //   let reg;
  //   console.log('here??', navigator, navigator.serviceWorker);
  //   navigator.serviceWorker.ready
  //     .then(function (swreg) {
  //       reg = swreg;
  //       console.log('got reg?', reg);
  //       return swreg.pushManager.getSubscription();
  //     })
  //     .then(function (sub) {
  //       console.log('And here...', sub);
  //       if (sub === null) {
  //         // Create a new subscription
  //         const vapidPublicKey =
  //           'BBXgWIs3azZ0f2Kz9ju1aGN3BzNEqWDvcwtjovhwDp1EJSLw-e6mqRb-o-gPnbJGMAJt84MPcEA3qTH0igqgIMk';
  //         const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
  //         return reg.pushManager.subscribe({
  //           userVisibleOnly: true,
  //           applicationServerKey: convertedVapidPublicKey,
  //         });
  //       } else {
  //         // We have a subscription
  //       }
  //     })
  //     .then(function (newSub) {
  //       console.log('newSub..', newSub);
  //       return fetch(
  //         'https://pwa-poc-c77e9.firebaseio.com/subscriptions.json',
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Accept: 'application/json',
  //           },
  //           body: JSON.stringify(newSub),
  //         }
  //       );
  //     })
  //     .then(function (res) {
  //       if (res.ok) {
  //         displayConfirmNotification();
  //       }
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="tablist-container">
      <div role="tablist" className="tablist">
        <button
          className="menu-btn"
          role="tab"
          id="lang"
          label="US"
          onClick={() => console.log('Clicked')}
        >
          +
        </button>
        <button
          role="tab"
          id="search"
          label="Search"
          className="menu-btn"
          onClick={onEnableNotifications}
        >
          <svg className="search-icon"></svg>
        </button>
        <button
          role="tab"
          id="hamburger-nav-menu"
          label="Nav"
          className="menu-btn"
          onClick={() => console.log('Clicked')}
        >
          <svg className="hamburger-icon"></svg>
        </button>
      </div>
      <div className="hide">
        <ul>
          <li>Global</li>
          <li>United States</li>
          <li>The Netherlands</li>
        </ul>
      </div>
      <div className="hide">
        <div>Search</div>
      </div>
    </div>
  );
};

export default TabPanel;
