import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Links } from '../links.module';
import { map } from 'rxjs/operators';


const authToken = sessionStorage.getItem('authToken')

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6',
    'auth-token': String(authToken)
  }),
};

const httpUploadOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6',
    'auth-token': String(authToken)
  }),

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private router: Router, private toastr: ToastrService,
    private http: HttpClient) {
  }

  login(data: any) {
    return this.http.post(Links.LOGIN, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  dashboardCount() {
    return this.http.get(Links.DASHBOARD_COUNT, httpOptions)
      .pipe(map((response: any) => response));
  }

  //REPORTED VIDEO
  getAllReport(data: any) {
    return this.http.get(Links.REPORT_LIST, httpOptions)
      .pipe(map((response: any) => response));
  }
  SearchReportPagination(page: any) {
    return this.http.get(Links.SEARCH_REPORT_LIST+ '?page=' + page ,httpUploadOptions)
      .pipe(map((response: any) => response));
  }

  deleteReport(id: any,data:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6',
        'auth-token': String(authToken)
      }),
      body: {
        reportId: id,
        videoId:data,
      }
    };
    return this.http.delete(Links.DELETE_REPORT, httpOptions)
      .pipe(map((response: any) => response));
  }
  getReportById(id: any,) {
    return this.http.get(Links.VIEW_REPORT_BY_ID + `/${id}`, httpOptions).pipe(map((response: any) => response));
  }


  //USER
  getAllUsers(data: any) {
    return this.http.get(Links.USER_LIST, httpOptions)
      .pipe(map((response: any) => response));
  }
  SearchUserPagination(page: any) {
    return this.http.get(Links.SEARCH_USER_LIST+ '?page=' + page ,httpUploadOptions)
      .pipe(map((response: any) => response));
  }
  deleteUser(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6',
        'auth-token': String(authToken)
      }),
      body: {
        userId: data
      }
    };
    return this.http.delete(Links.DELETE_USER, httpOptions)
      .pipe(map((response: any) => response));
  }
  changeUserStatus(data: any, status: any) {
    return this.http.put(Links.CHANGE_USER_STATUS + `?userId=${data}&status=${status}`, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

  changeStaffStatus(data: any, status: any) {
    return this.http.put(Links.CHANGE_STAFF_STATUS + `?userId=${data}&status=${status}`, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

  //STAFF
  getAllStaff(data: any) {
    return this.http.get(Links.USER_STAFF, httpOptions)
      .pipe(map((response: any) => response));
  }

  addStaffUser(form: any) {
    return this.http.post(Links.ADD_STAFF, form, httpOptions).pipe(map((response: any) => response));
  }

  updateStaff( form: any) {
    const formData = new FormData();
    formData.append('userId', form.userId);
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('phone_number', form.phone_number);
    formData.append('email', form.email);
    
    return this.http.post(Links.UPDATE_STAFF,formData, httpUploadOptions).pipe(map((response: any) => response));
  }

  getStaffById(id: any,) {
    return this.http.get(Links.GET_Staff_BY_ID + `/${id}`, httpOptions).pipe(map((response: any) => response));
  }
  SearchStaffPagination(page: any,) {
    return this.http.get(Links.SEARCH_Staff_PAGINATION+ '?page=' + page ,httpUploadOptions)
      .pipe(map((response: any) => response));
  }

  //GIF
  getAllGif(data: any) {
    return this.http.get(Links.GIF_LIST + `?type=${data}`, httpOptions)
      .pipe(map((response: any) => response));
  }

  addGif(form: any) {
    const formData = new FormData();
    formData.append('files', form.files);
    formData.append('title', form.title);
    
    return this.http.post(Links.ADD_GIF, formData, httpUploadOptions).pipe(map((response: any) => response));
  }


  getTransitionById(id: any,) {
    return this.http.get(Links.GET_TRANSITION_BY_ID + `/${id}`, httpOptions).pipe(map((response: any) => response));
  }

  deleteTransition(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6',
        'auth-token': String(authToken)
      }),
      body: {
        id: data
      }
    };
    return this.http.delete(Links.DELETE_TRANSITION_BY_ID, httpOptions)
      .pipe(map((response: any) => response));
  }

  statusTransition(id: any,status: any) {
    return this.http.put(Links.STATUS_CHANGED+ '?transitionId=' + id + '&status=' + status,{},httpUploadOptions)
      .pipe(map((response: any) => response));
  }

  SearchTransition(type: any,data: any) {
    return this.http.get(Links.SEARCH+ '?type=' + type + '&queryString=' + data,httpUploadOptions)
      .pipe(map((response: any) => response));
  }
  SearchPagination(page: any,type: any,) {
    return this.http.get(Links.SEARCH+ '?page=' + page + '&type='+type ,httpUploadOptions)
      .pipe(map((response: any) => response));
  }


  //EMOJI
  getAllEmoji(page: any,data: any) {
    return this.http.get(Links.GIF_LIST + `?page${page}&type=${data}`, httpOptions)
      .pipe(map((response: any) => response));
  }
  addEmoji(form: any) {
    const formData = new FormData();
    formData.append('files', form.files);
    formData.append('title', form.title);
    return this.http.post(Links.ADD_EMOJI, formData, httpUploadOptions).pipe(map((response: any) => response));
  }

  //ANIMATION
  addAnimation(form: any) {
    const formData = new FormData();
    formData.append('files', form.files);
    formData.append('title', form.title);
    return this.http.post(Links.ADD_ANIMATION, formData, httpUploadOptions).pipe(map((response: any) => response));
  }

  //SOUNDS
  addSounds(form: any) {
    const formData = new FormData();
    formData.append('files', form.files);
    formData.append('title', form.title);
    return this.http.post(Links.ADD_SOUNDS, formData, httpUploadOptions).pipe(map((response: any) => response));
  }

  //MUSIC
  addMusic(form: any) {
    const formData = new FormData();
    formData.append('files', form.files);
    formData.append('title', form.title);
    return this.http.post(Links.ADD_MUSIC, formData, httpUploadOptions).pipe(map((response: any) => response));
  }

  //Photo
  addPhoto(form: any) {
    const formData = new FormData();
    formData.append('files', form.files);
    formData.append('title', form.title);
    return this.http.post(Links.ADD_PHOTO, formData, httpUploadOptions).pipe(map((response: any) => response));
  }

  //DEMO
  updateUserStatus(id: any, status: any) {
    return this.http.post(Links.UPDATE_USER_STATUS + '?uuid=' + id + '&status=' + status, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

  changePassword(data: any) {
    return this.http.post(Links.CHANGE_PASSWORD, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  forgotPassword(email: any) {
    return this.http.post(Links.FORGOT_PASSWORD + '?email=' + email, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

  resetPassword(data: any, reqType: any) {
    if (reqType) {
      return this.http.post(Links.USER_RESET_PASSWORD, data, httpOptions)
        .pipe(map((response: any) => response));
    } else {
      return this.http.post(Links.RESET_PASSWORD, data, httpOptions)
        .pipe(map((response: any) => response));
    }
  }

  verifyRequest(type: any, token: any, reqType: any) {
    if (reqType) {
      return this.http.post(Links.USER_VERIFY_REQUEST + '?type=' + type + '&token=' + token, {}, httpOptions)
        .pipe(map((response: any) => response));
    } else {
      return this.http.post(Links.VERIFY_RESET_PASSWORD_REQUEST + '?type=' + type + '&token=' + token, {}, httpOptions)
        .pipe(map((response: any) => response));
    }
  }

  getUser(uuid: any) {
    return this.http.post(Links.GET_USER_DETAIL + '?uuid=' + uuid, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

}
