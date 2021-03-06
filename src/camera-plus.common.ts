/**********************************************************************************
 * (c) 2017, nStudio, LLC & LiveShopper, LLC
 * Licensed under a Commercial license.
 *
 * Version 1.0.0                                        			   team@nStudio.io
 **********************************************************************************/

import { ContentView } from "tns-core-modules/ui/content-view";
import { CameraPlus as CameraPlusDefinition } from ".";

export class CameraUtil {
  public static debug: boolean = false;
}

export const CLog = (...args) => {
  if (CameraUtil.debug) {
    console.log("CameraPlus", args);
  }
};

export type CameraTypes = "front" | "rear";

export abstract class CameraPlusBase extends ContentView
  implements CameraPlusDefinition {
  public set debug(value: boolean) {
    CameraUtil.debug = value;
  }
  public events: ICameraPlusEvents;

  /**
   * Video Support (off by default)
   * defined statically due to necessity to set this very early before constructor
   * users should set this in a component constructor before their view creates the component
   * and can reset it before different using in different views if they want to go back/forth
   * between photo/camera and video/camera
   */
  public static enableVideo: boolean = false;

  /**
   * Default camera: must be set early before constructor to default the camera correctly on launch (default to rear)
   */
  public static defaultCamera: CameraTypes = "rear";

  /*
   * String value for hooking into the errorEvent. This event fires when an error is emitted from CameraPlus.
   */
  public static errorEvent = "errorEvent";

  /**
   * String value for hooking into the photoCapturedEvent. This event fires when a photo is taken.
   */
  public static photoCapturedEvent = "photoCapturedEvent";

  /**
   * String value for hooking into the toggleCameraEvent. This event fires when the device camera is toggled.
   */
  public static toggleCameraEvent = "toggleCameraEvent";

  /**
   * String value when hooking into the imagesSelectedEvent. This event fires when images are selected from the device library/gallery.
   */
  public static imagesSelectedEvent = "imagesSelectedEvent";

  /**
   * String value when hooking into the videoRecordingStartedEvent. This event fires when video starts recording.
   */
  public static videoRecordingStartedEvent = "videoRecordingStartedEvent";

  /**
   * String value when hooking into the videoRecordingFinishedEvent. This event fires when video stops recording but has not processed yet.
   */
  public static videoRecordingFinishedEvent = "videoRecordingFinishedEvent";

  /**
   * String value when hooking into the videoRecordingReadyEvent. This event fires when video has completed processing and is ready to be used.
   */
  public static videoRecordingReadyEvent = "videoRecordingReadyEvent";

  /**
   * If true the default take picture event will present a confirmation dialog. Default is true.
   */
  @GetSetProperty() public confirmPhotos: boolean = true;

  /**
   * If true the default videorecordingready event will present a confirmation dialog. Default is false.
   */
  @GetSetProperty() public confirmVideo: boolean = false;

  /**
   * If true the default take picture event will save to device gallery. Default is true.
   */
  @GetSetProperty() public saveToGallery: boolean = true;

  /**
   * The gallery/library selection mode. 'single' allows one image to be selected. 'multiple' allows multiple images. Default is 'multiple'
   */
  @GetSetProperty()
  public galleryPickerMode: "single" | "multiple" = "multiple";

  /**
   * If true the default flash toggle icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty() public showFlashIcon: boolean = true;

  /**
   * If true the default camera toggle (front/back) icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty() public showToggleIcon: boolean = true;

  /**
   * If true the default capture (take picture) icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty() public showCaptureIcon: boolean = true;

  /**
   * If true the choose from gallery/library icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty() public showGalleryIcon: boolean = true;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is on (enabled).
   */
  @GetSetProperty() public flashOnIcon: string = "";

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  @GetSetProperty() public flashOffIcon: string = "";

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  @GetSetProperty() public toggleCameraIcon: string = "";

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Capture button icon.
   */
  @GetSetProperty() public takePicIcon: string = "";

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Open Gallery button icon.
   */
  @GetSetProperty() public galleryIcon: string = "";

  /**
   * *ANDROID ONLY* - If true the camera will auto focus to capture the image. Default is true.
   */
  @GetSetProperty() public autoFocus: boolean = true;

  /**
   * *iOS ONLY* - Enable/disable double tap gesture to switch camera. (enabled)
   */
  @GetSetProperty() public doubleTapCameraSwitch: boolean = true;

  /** If true it will crop the picture to the center square **/
  @GetSetProperty() public autoSquareCrop: boolean = false;

  /**
   * Toggles the device camera (front/back).
   */
  toggleCamera(): void {}

  /**
   * Toggles the active camera flash mode.
   */
  toggleFlash(): void {}

  /**
   * Gets the flash mode
   * Android: various strings possible
   * iOS: only 'on' or 'off'
   */
  getFlashMode(): string {
    return null;
  }

  /**
   * Opens the device Library (image gallery) to select images.
   */
  chooseFromLibrary(options?: IChooseOptions): Promise<any> {
    return new Promise((resolve, reject) => reject());
  }

  /**
   * Takes a picture of the current preview of the CameraPlus.
   */
  takePicture(options?: ICameraOptions): void {}

  /**
   * Start recording video
   * @param options IVideoOptions
   */
  record(options?: IVideoOptions): void {}

  /**
   * Stop recording video
   */
  stop(): void {}

  /**
   * Returns true if the device has at least one camera.
   */
  isCameraAvailable(): boolean {
    return false;
  }

  /**
   * Returns current camera <front | rear>
   */
  getCurrentCamera(): "rear" | "front" {
    return "rear";
  }

  /**
   * * ANDROID ONLY * - will prompt the user for runtime permission to use the device Camera.
   */
  requestCameraPermissions(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve());
  }

  /**
   * * ANDROID ONLY * - Returns true if the application has permission to use the device camera.
   */
  hasCameraPermission(): boolean {
    return false;
  }

  /**
   * * ANDROID ONLY * - will prompt the user for runtime permission to read and write to storage.
   */
  requestStoragePermissions(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(false));
  }

  /**
   * * ANDROID ONLY * - Returns true if the application has permission to READ/WRITE STORAGE.
   */
  hasStoragePermissions(): boolean {
    return false;
  }

  /**
   * * ANDROID ONLY * - will prompt the user for runtime permission to record audio for video recording.
   */
  requestAudioPermissions(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve());
  }

  /**
   * * ANDROID ONLY * - Returns true if the application has permission to record audio, which is necessary for video recording.
   */
  hasAudioPermission(): boolean {
    return false;
  }

  /**
   * * ANDROID ONLY * - will prompt the user for runtime permission to record audio and write storage to save video recordings.
   */
  requestVideoRecordingPermissions(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
  }

  /**
   * * ANDROID ONLY * - Returns true if the application has permission to record audio and write storage for saving videos.
   */
  hasVideoRecordingPermissions(): boolean {
    return false;
  }

  /**
   * * ANDROID ONLY * - Gets the number of cameras on a device.
   */
  getNumberOfCameras(): number {
    return 0;
  }

  /**
   * * ANDROID ONLY * - Returns true if the current camera has a flash mode.
   */
  hasFlash(): boolean {
    return false;
  }

  /**
   * Notify events by name and optionally pass data
   */
  public sendEvent(eventName: string, data?: any, msg?: string) {
    this.notify({
      eventName,
      object: this,
      data,
      message: msg
    });
  }
}

export interface ICameraOptions {
  confirm?: boolean;
  saveToGallery?: boolean;
  keepAspectRatio?: boolean;
  height?: number;
  width?: number;
  autoSquareCrop?: boolean;
}

export interface IChooseOptions {
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
}

export interface ICameraPlusEvents {
  photoCapturedEvent: any;
  toggleCameraEvent: any;
  imagesSelectedEvent: any;
  videoRecordingStartedEvent: any;
  videoRecordingFinishedEvent: any;
  videoRecordingReadyEvent: any;
}

export interface IVideoOptions {
  confirm?: boolean;
  saveToGallery?: boolean;
  height?: number;
  width?: number;
}

export function GetSetProperty() {
  return (target, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: function() {
        return this["_" + propertyKey];
      },
      set: function(value) {
        if (this["_" + propertyKey] === value) {
          return;
        }
        if (value === "true") {
          value = true;
        } else if (value === "false") {
          value = false;
        }
        this["_" + propertyKey] = value;
      },
      enumerable: true,
      configurable: true
    });
  };
}
