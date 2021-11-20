import StudentsPageConfig from './StudentsPageConfig';
import PlaygroundPageConfig from './PlaygroundPageConfig';
import ForgotPassword2PageConfig from '../auth/forgot-password-2/ForgotPassword2PageConfig';
import ForgotPasswordPageConfig from '../auth/forgot-password/ForgotPasswordPageConfig';
import LockPageConfig from '../auth/lock/LockPageConfig';
import LoginPageConfig from '../auth/login/LoginPageConfig';
import Login2PageConfig from '../auth/login-2/Login2PageConfig';
import Login3PageConfig from '../auth/login-3/Login3PageConfig';
import MailConfirmPageConfig from '../auth/mail-confirm/MailConfirmPageConfig';
import Register2PageConfig from '../auth/register-2/Register2PageConfig';
import Register3PageConfig from '../auth/register-3/Register3PageConfig';
import RegisterPageConfig from '../auth/register/RegisterPageConfig';
import ResetPassword2PageConfig from '../auth/reset-password-2/ResetPassword2PageConfig';
import ResetPasswordPageConfig from '../auth/reset-password/ResetPasswordPageConfig';
import Error404PageConfig from '../errors/404/Error404PageConfig';
import Error500PageConfig from '../errors/500/Error500PageConfig';
import StudentPageConfig from '../profile/StudentPageConfig';
import AdminProfilePageConfig from "../admin-profile/AdminProfilePageConfig";
import TeacherProfilePageConfig from "../teacher-profile/TeacherProfilePageConfig";
import LeaderboardPageConfig from "../leaderboard/LeaderboardPageConfig";

const musabPagesConfigs = [
    StudentsPageConfig,
    PlaygroundPageConfig,
    ForgotPassword2PageConfig,
    ForgotPasswordPageConfig,
    LockPageConfig,
    LoginPageConfig,
    Login2PageConfig,
    Login3PageConfig,
    MailConfirmPageConfig,
    Register2PageConfig,
    Register3PageConfig,
    RegisterPageConfig,
    ResetPassword2PageConfig,
    ResetPasswordPageConfig,
    Error404PageConfig,
    Error500PageConfig,
    StudentPageConfig,
    AdminProfilePageConfig,
    TeacherProfilePageConfig,
    LeaderboardPageConfig,

    //TODOXD maybe remove authrole from home page config
];

export default musabPagesConfigs;