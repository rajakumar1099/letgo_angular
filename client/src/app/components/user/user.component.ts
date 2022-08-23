import { Component, OnInit } from '@angular/core';
import { Routers } from 'src/app/core/common/common.types';
import { States } from 'src/app/core/features';
import { AuthState } from '../authentication/core/types/auth.types';
import { UserService } from './core/services/user.service';
import * as UserProfileActions from '../user/core/store/user.actions';
import { Constants } from 'src/app/utils/constants';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getProfile } from './core/store/user.selector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public routers = Routers;
  public user$!: Observable<AuthState>;

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private store: Store<{
      [States.Profile]: AuthState;
    }>
  ) {}

  ngOnInit(): void {
    const userUid = this.commonService.getLocalStorageData(Constants.TAG_UID);
    if (userUid) {
      this.store?.dispatch(UserProfileActions.GetProfile({ uid: userUid }));
    }
    this.user$ = this.store.select(getProfile)
  }
}
