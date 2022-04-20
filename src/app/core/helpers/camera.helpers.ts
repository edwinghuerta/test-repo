const nav: Navigator | any = navigator;

nav.getMedia =
  nav.getUserMedia ||
  nav.webkitGetUserMedia ||
  nav.mozGetUserMedia ||
  nav.msGetUserMedia;

export class CameraInput {
  private streaming = false;
  private currentStream: MediaStream;
  private current = 0;

  constructor(private video: HTMLVideoElement, device: number = 0) {
    this.video.addEventListener('canplay', () => (this.streaming = true));
    this.select(device);
  }

  private setMedia(stream: MediaStream = this.currentStream, autoplay = true) {
    const parent = this.video.parentElement;
    const { width: pw } = getComputedStyle(parent);
    const width = +pw.replace('px', '');
    this.video.width = width;

    if (this.currentStream) this.stop();
    this.currentStream = stream;
    if (nav.mozGetUserMedia)
      (this.video as any).mozSrcObject = this.currentStream;
    else this.video.srcObject = this.currentStream;
    if (autoplay) this.video.play();
  }

  async select(index: number | 'next' | 'prev' = 0) {
    let deviceId: string;
    const devices = await this.devices();

    if (index === 'prev') index = (this.current - 1) % devices.length;
    if (index === 'next') index = (this.current + 1) % devices.length;
    if (isNaN(index)) index = 0;

    deviceId = devices[index]?.deviceId;
    this.current = deviceId ? index : 0;

    if (!deviceId) console.error('Device selected not exists');
    return this.selectById(deviceId);
  }

  async devices(): Promise<InputDeviceInfo[]> {
    const devices = (await nav.mediaDevices.enumerateDevices()) || [];
    return devices.filter((d: InputDeviceInfo) => d.kind === 'videoinput');
  }

  async selectById(deviceId?: string) {
    const video = deviceId ? { deviceId } : true;
    return new Promise((resolve, reject) => {
      const constrains = { video, audio: false };
      const callback = (stream) => {
        this.setMedia(stream);
        resolve(true);
      };
      nav.getMedia(constrains, callback, reject);
    });
  }

  async takePicture() {
    if (this.video) {
      const styles = getComputedStyle(this.video);
      const width = +styles.width.replace('px', '');
      const height = +styles.height.replace('px', '');
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(this.video, 0, 0, width, height);
      return canvas.toDataURL('image/png');
    }
  }

  async stop() {
    this.video.pause();
    delete (this.video as any).mozSrcObject;
    delete this.video.srcObject;
    this.currentStream.getTracks().forEach((ms) => ms.stop());
    this.currentStream = undefined;
  }
}

// export function captureCamera(el: HTMLElement) {
//   const photo = document.querySelector('#photo');
//   const startbutton = document.querySelector('#startbutton');

//   function takepicture() {
//     canvas.width = width;
//     canvas.height = height;
//     canvas.getContext('2d').drawImage(video, 0, 0, width, height);
//     var data = canvas.toDataURL('image/png');
//     photo.setAttribute('src', data);
//   }

//   startbutton.addEventListener(
//     'click',
//     function (ev) {
//       takepicture();
//       ev.preventDefault();
//     },
//     false
//   );
// }
