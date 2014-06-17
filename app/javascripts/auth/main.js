define([
    'angular',
    './controllers/ldap-auth',
    './services/ldap-auth'
], function(
    angular,
    ldapAuthCtrl,
    ldapAuth
) {
'use strict';

    angular
        .module('wdAuth', [])
        .controller('wdLdapCtrl', ldapAuthCtrl)
        .factory('wdLdap', ldapAuth);

// 结束
});
