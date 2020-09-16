import React, { useState, useEffect } from 'react';

const CreditAppCreate = () => {
  const [showCreateApp, setShowCreateApp] = useState(false);
  const [creditApps, setCreditApps] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let picture;

  // useEffect(() => {
  //   fetch('https://pwa-poc-c77e9.firebaseio.com/apps.json')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log('DID WE FETCH THE APPS? ', data);
  //       let appsArray = [];
  //       for (let app in data) {
  //         appsArray.push(data[app]);
  //       }
  //       setCreditApps(appsArray);
  //     })
  //     .catch((err) => {
  //       console.log('Error fetching apps!', err);
  //     });
  // }, []);

  // const renderCreditApps =
  //   creditApps &&
  //   creditApps.map((app) => {
  //     return (
  //       <div key={app.id}>
  //         <div>{app.name}</div>
  //         <div>{app.amount}</div>
  //       </div>
  //     );
  //   });

  const onShowCreateApp = () => {
    setLoading(false);
    setShowCreateApp(!showCreateApp);
    setTimeout(() => {
      initializeMedia();
    }, 1);
  };

  const initializeMedia = () => {
    const videoPlayer = document.querySelector('#player');
    if (!('mediaDevices' in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!('getUserMedia' in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented!'));
        }

        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        videoPlayer.srcObject = stream;
        console.log(
          'Streams....',
          videoPlayer,
          'srcObject: ',
          videoPlayer.srcObject
        );
        videoPlayer.style.display = 'block';
      })
      .catch(function (err) {
        //imagePickerArea.style.display = 'block';
      });
  };

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  const onCaptureBtnClick = (e) => {
    e.preventDefault();
    const videoPlayer = document.querySelector('#player');
    const canvasElement = document.querySelector('#canvas');
    const captureButton = document.querySelector('#capture-btn');
    //let picture;

    console.log('VideoObject here: ', videoPlayer);
    canvasElement.style.display = 'block';
    videoPlayer.style.display = 'none';
    captureButton.style.display = 'none';

    const context = canvasElement.getContext('2d');
    console.log('do we get here? ', context, canvasElement);
    context.drawImage(
      videoPlayer,
      0,
      0,
      canvasElement.width,
      videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width)
    );
    videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    picture = dataURItoBlob(canvasElement.toDataURL());
  };

  const disableVideo = () => {
    const videoPlayer = document.querySelector('#player');
    // imagePickerArea.style.display = 'none';
    // videoPlayer.style.display = 'none';
    // canvasElement.style.display = 'none';
    // locationBtn.style.display = 'inline';
    // locationLoader.style.display = 'none';
    // captureButton.style.display = 'inline';
    setTimeout(() => {
      if (videoPlayer.srcObject) {
        videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
          track.stop();
        });
      }
    }, 1);
    // setTimeout(function () {
    //   createPostArea.style.transform = 'translateY(100vh)';
    // }, 1);
    // createPostArea.style.display = 'none';
  };

  // const onFormSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(!isLoading);
  //   setShowCreateApp(!showCreateApp);
  // };
  // eslint-disable-next-line no-restricted-globals
  // var dbPromise = open('apps-store', 1, function (db) {
  //   console.log('Inside dbPromise: ', db);
  //   if (!db.objectStoreNames.contains('apps')) {
  //     db.createObjectStore('apps', { keyPath: 'id' });
  //   }
  //   if (!db.objectStoreNames.contains('sync-apps')) {
  //     db.createObjectStore('sync-apps', { keyPath: 'id' });
  //   }
  // });

  function sendData() {
    var id = new Date().toISOString();
    var postData = new FormData();
    postData.append('id', id);
    // postData.append('title', titleInput.value);
    // postData.append('location', locationInput.value);
    // postData.append('rawLocationLat', fetchedLocation.lat);
    // postData.append('rawLocationLng', fetchedLocation.lng);
    postData.append('file', picture, id + '.png');

    // fetch(
    //   'https://us-central1-pwa-poc-c77e9.cloudfunctions.net/storeCreditAppData',
    //   {
    //     method: 'POST',
    //     body: postData,
    //   }
    // ).then(function (res) {
    //   console.log('Sent data', res);
    //   //updateUI();
    // });
  }

  function writeData(st, data) {
    // console.log('WriteData: ', st, 'data: ', data, 'dbPromise: ', dbPromise);
    // return dbPromise.then(function (db) {
    //   console.log('Do we have a DB??', db);
    //   var tx = db.transaction(st, 'readwrite');
    //   var store = tx.objectStore(st);
    //   store.put(data);
    //   return tx.complete;
    // });
  }

  const onFormSubmit = (e) => {
    console.log('SUBMIT FORM...');
    e.preventDefault();

    // if (titleInput.value.trim() === '' || locationInput.value.trim() === '') {
    //   alert('Please enter valid data!');
    //   return;
    // }

    //closeCreatePostModal();
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      console.log('Navigator: ', navigator);
      navigator.serviceWorker.ready.then(function (sw) {
        console.log('inside serviceWorker...', sw);
        const post = {
          id: new Date().toISOString(),
          //title: titleInput.value,
          //location: locationInput.value,
          picture: picture,
          //rawLocation: fetchedLocation,
        };
        writeData('sync-apps', post)
          .then(function () {
            console.log('WRITE DATA....', post);
            return sw.sync.register('sync-new-apps');
          })
          .then(function () {
            var snackbarContainer = document.querySelector(
              '#confirmation-toast'
            );
            var data = { message: 'Your Post was saved for syncing!' };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    } else {
      sendData();
    }

    setLoading(!isLoading);
    setShowCreateApp(!showCreateApp);
  };

  const onClose = () => {
    disableVideo();
    setShowCreateApp(false);
  };

  return (
    <div className="create-app-container">
      {!showCreateApp ? (
        <div className="create-app-btn-wrapper">
          <button className="create-app-btn" onClick={onShowCreateApp}>
            New Credit App
          </button>
        </div>
      ) : null}
      {showCreateApp ? (
        <div className="create-app-form-wrapper">
          <div className="close-btn-wrapper">
            <h2 className="create-app-heading">New Credit App</h2>
            <button
              id="close-create-app"
              className="close-btn"
              onClick={onClose}
            >
              <svg className="close-icon"></svg>
            </button>
          </div>
          <form className="create-app-form">
            <div>
              <video id="player" autoPlay></video>
              <canvas id="canvas" width="320px" height="240px"></canvas>
              <div className="capture-btn-wrapper">
                <button
                  onClick={onCaptureBtnClick}
                  className="capture-btn"
                  id="capture-btn"
                >
                  Capture
                </button>
              </div>
            </div>
            <div className="input-wrapper">
              <label className="input-label">Name</label>
              <input className="input-text" />
            </div>
            <div className="input-wrapper">
              <label className="input-label">Amount</label>
              <input className="input-text" />
            </div>
            <div className="form-button-wrapper">
              <button
                onClick={onFormSubmit}
                disabled={isLoading}
                className="form-btn primary"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateApp(!showCreateApp)}
                disabled={isLoading}
                className="form-btn secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CreditAppCreate;
