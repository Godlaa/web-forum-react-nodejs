import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._is_auth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool){
        this._is_auth = bool;
    }
    
    setUser(user){
        this._user = user;
    }

    get isAuth(){
        return this._is_auth;
    }

    get user(){
        return this._user;
    }

    get userId(){
        return this._user.id;
    }
}