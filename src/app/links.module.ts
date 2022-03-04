export class Links {

    public static BASE = 'http://13.232.44.91:3000';
    // public static BASE = 'http://localhost:8080/onebrush-api';
    // public static BASE = 'https://highlightreel.herokuapp.com';

    public static LOGIN = Links.BASE + '/web/api/admin/login';
    public static DASHBOARD_COUNT = Links.BASE + '/admin/dashborad-count';
    public static CHANGE_PASSWORD = Links.BASE + '/admin/change-password';
    public static FORGOT_PASSWORD = Links.BASE + '/admin/forgot-password';
    public static RESET_PASSWORD = Links.BASE + '/admin/reset-password';
    public static VERIFY_RESET_PASSWORD_REQUEST = Links.BASE + '/admin/verify-reset-password-request';

    //USERS
    public static USER_LIST = Links.BASE + '/web/api/admin/get_all_users';
    public static DELETE_USER = Links.BASE + '/web/api/admin/delete_user';
    public static CHANGE_USER_STATUS = Links.BASE + '/web/api/admin/change_user_status';

    //REPORTED VIDEO
    public static REPORT_LIST = Links.BASE + '/web/api/admin/get_reported_videos';
    public static DELETE_REPORT = Links.BASE + '/web/api/admin/delete_reported_video';
    public static VIEW_REPORT_BY_ID = Links.BASE + '';

    //STAFF
    public static USER_STAFF = Links.BASE + '/web/api/admin/get_all_staff';
    public static ADD_STAFF = Links.BASE + '/web/api/admin/signup';
    public static GET_Staff_BY_ID = Links.BASE + '/web/api/admin/get_staff_by_id';
    public static UPDATE_STAFF = Links.BASE + '/web/api/admin/edit_staff';

    //GIF
    public static ADD_GIF = Links.BASE + '/web/api/admin/upload_GIF';
    public static GIF_LIST = Links.BASE + '/web/api/admin/get_transitions';
    public static GET_TRANSITION_BY_ID = Links.BASE + '/web/api/admin/get_transitions_by_id';
    public static DELETE_TRANSITION_BY_ID = Links.BASE + '/web/api/admin/delete_transitions';

    
    //EMOJI
    public static ADD_EMOJI = Links.BASE + '/web/api/admin/upload_emoji';
    public static EMOJI_LIST = Links.BASE + '/web/api/admin/get_transitions?page';

    //ANIMATION
    public static ADD_ANIMATION = Links.BASE + '/web/api/admin/upload_animation';
    public static ANIMATION_LIST = Links.BASE + '/web/api/admin/get_transitions?page';

    //SOUNDS
    public static ADD_SOUNDS = Links.BASE + '/web/api/admin/upload_sounds';
    public static SOUNDS_LIST = Links.BASE + '/web/api/admin/get_transitions?page';

    //MUSIC
    public static ADD_MUSIC = Links.BASE + '/web/api/admin/upload_music';
    public static MUSIC_LIST = Links.BASE + '/web/api/admin/get_transitions?page';

    //PHOTOS
    public static ADD_PHOTO = Links.BASE + '/web/api/admin/upload_photos';
    public static PHOTOS_LIST = Links.BASE + '/web/api/admin/get_transitions?page';



    public static UPDATE_USER_STATUS = Links.BASE + '/user/update-status';
    public static USER_RESET_PASSWORD = Links.BASE + '/user/reset-password';
    public static USER_VERIFY_REQUEST = Links.BASE + '/user/verify-request';
    public static GET_USER_DETAIL = Links.BASE + '/user/get-user';
    // public static USER_VERIFY_ACCOUNT_REQUEST = Links.BASE + '/user/verify-user-account';
}
