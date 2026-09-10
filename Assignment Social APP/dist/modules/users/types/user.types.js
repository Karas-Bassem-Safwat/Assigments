"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (exports.Gender = Gender = {}));
var Role;
(function (Role) {
    Role[Role["user"] = 0] = "user";
    Role[Role["admin"] = 1] = "admin";
    Role[Role["super_admin"] = 2] = "super_admin";
    Role[Role["super_super_admin"] = 3] = "super_super_admin";
})(Role || (exports.Role = Role = {}));
