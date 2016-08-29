import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CodePush, SyncStatus, SyncOptions, SuccessCallback, DownloadProgress } from 'ionic-native';
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
      return CodePush.sync(syncOptions, downloadProgress);
    }
  }
}
