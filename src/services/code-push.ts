import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Network,
  CodePush,
  SyncStatus,
  SyncOptions,
  SuccessCallback,
  DownloadProgress
} from 'ionic-native';
import { Platform } from 'ionic-angular';

@Injectable()
export class CodePushService {

  constructor(
    private platform: Platform) {
  }

  sync(syncOptions?: SyncOptions,
    downloadProgress?: SuccessCallback<DownloadProgress>): Observable<SyncStatus> {
    if (!this.platform.is('cordova')) {
      return Observable.of(SyncStatus.UP_TO_DATE);
    } else {
      // before we issue the sync call let's make sure that
      // we do have internet connectivity
      if (Network.connection === 'none') {
        return Observable.of(SyncStatus.UP_TO_DATE);
      }
      return CodePush.sync(syncOptions, downloadProgress);
    }
  }
}
