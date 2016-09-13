/* jshint node: true */
'use strict';

var path = require('path');
var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-spin-button2',

  treeForVendor: function(tree) {

    // Since spin.js is an npm module. we won't be able to use it directly.
    // Modify the broccoli pipeline to include spin.js module in vendor.js

    var nodes = ['spin.js'].map((function(pkgName){

      var packagePath = path.dirname(require.resolve(pkgName));
      var packageTree = new Funnel(this.treeGenerator(packagePath), {
        srcDir: '/',
        // destDir is the name of directory that ember-cli will create inside vendor directory
        // this name is used in app.import(...) call in `included` hook
        destDir: pkgName
      });

      return packageTree;

    }).bind(this));


    if (tree) {
      nodes.unshift(tree);
    }

    return new MergeTrees(nodes);
  },




  included: function(appOrAddon) {
    var app = appOrAddon.app || appOrAddon;

    if (app.__emberSpinButton2IncludedInvoked) {
      return;
    }

    app.__emberSpinButton2IncludedInvoked = true;
    this._super.included && this._super.included.apply(this, arguments);

    app.import('vendor/spin.js/spin.js');
    app.import('vendor/spinner.js', {
      exports: {
        spinner: ['default'],
      },
    });

  }

};
