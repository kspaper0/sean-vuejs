webpackJsonp([8],{Fhik:function(e,t){},Plmk:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("pFYg"),a=s.n(i),o={name:"EditProfile",data:function(){return{username:"",sex:"",hobbies:[],introduction:""}},created:function(){var e=this.$store.state.user;if(e&&"object"===(void 0===e?"undefined":a()(e))){var t=e.name,s=e.sex,i=e.hobbies,o=e.introduction;this.username=t,this.sex=s||this.sex,this.hobbies=i||this.hobbies,this.introduction=o}},methods:{updateProfile:function(e){var t=this;this.$nextTick(function(){e.target.canSubmit&&(t.$store.dispatch("updateUser",{name:t.username,sex:t.sex,hobbies:t.hobbies,introduction:t.introduction}),t.$message.show("Updated Successfully"))})}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-9 left-col"},[s("div",{staticClass:"panel panel-default padding-md"},[s("div",{staticClass:"panel-body"},[e._m(0),e._v(" "),s("hr"),e._v(" "),s("div",{staticClass:"form-horizontal",attrs:{"data-validator-form":""}},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-2 control-label"},[e._v("Username")]),e._v(" "),s("div",{staticClass:"col-sm-6"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.username,expression:"username",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator:input.required",value:{title:"Username",regex:/^[a-zA-Z]+\w*\s?\w*$/,error:"The field must start with letters"},expression:"{ title: 'Username', regex: /^[a-zA-Z]+\\w*\\s?\\w*$/, error: 'The field must start with letters' }",arg:"input",modifiers:{required:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-2 control-label"},[e._v("Gender")]),e._v(" "),s("div",{staticClass:"col-sm-6"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],staticClass:"form-control",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.sex=t.target.multiple?s:s[0]}}},[s("option",{attrs:{value:""}},[e._v("N/A")]),e._v(" "),s("option",{attrs:{value:"male"}},[e._v("M")]),e._v(" "),s("option",{attrs:{value:"female"}},[e._v("F")])])])]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-2 control-label"},[e._v("Hobbies")]),e._v(" "),s("div",{staticClass:"col-sm-6"},[s("label",{staticClass:"checkbox-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.hobbies,expression:"hobbies"}],attrs:{value:"Sports",type:"checkbox"},domProps:{checked:Array.isArray(e.hobbies)?e._i(e.hobbies,"Sports")>-1:e.hobbies},on:{change:function(t){var s=e.hobbies,i=t.target,a=!!i.checked;if(Array.isArray(s)){var o=e._i(s,"Sports");i.checked?o<0&&(e.hobbies=s.concat(["Sports"])):o>-1&&(e.hobbies=s.slice(0,o).concat(s.slice(o+1)))}else e.hobbies=a}}}),e._v(" Sports\n              ")]),e._v(" "),s("label",{staticClass:"checkbox-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.hobbies,expression:"hobbies"}],attrs:{value:"Fitness",type:"checkbox"},domProps:{checked:Array.isArray(e.hobbies)?e._i(e.hobbies,"Fitness")>-1:e.hobbies},on:{change:function(t){var s=e.hobbies,i=t.target,a=!!i.checked;if(Array.isArray(s)){var o=e._i(s,"Fitness");i.checked?o<0&&(e.hobbies=s.concat(["Fitness"])):o>-1&&(e.hobbies=s.slice(0,o).concat(s.slice(o+1)))}else e.hobbies=a}}}),e._v(" Fitness\n              ")]),e._v(" "),s("label",{staticClass:"checkbox-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.hobbies,expression:"hobbies"}],attrs:{value:"Travel",type:"checkbox"},domProps:{checked:Array.isArray(e.hobbies)?e._i(e.hobbies,"Travel")>-1:e.hobbies},on:{change:function(t){var s=e.hobbies,i=t.target,a=!!i.checked;if(Array.isArray(s)){var o=e._i(s,"Travel");i.checked?o<0&&(e.hobbies=s.concat(["Travel"])):o>-1&&(e.hobbies=s.slice(0,o).concat(s.slice(o+1)))}else e.hobbies=a}}}),e._v(" Travel\n              ")]),e._v(" "),s("label",{staticClass:"checkbox-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.hobbies,expression:"hobbies"}],attrs:{value:"Games",type:"checkbox"},domProps:{checked:Array.isArray(e.hobbies)?e._i(e.hobbies,"Games")>-1:e.hobbies},on:{change:function(t){var s=e.hobbies,i=t.target,a=!!i.checked;if(Array.isArray(s)){var o=e._i(s,"Games");i.checked?o<0&&(e.hobbies=s.concat(["Games"])):o>-1&&(e.hobbies=s.slice(0,o).concat(s.slice(o+1)))}else e.hobbies=a}}}),e._v(" Games\n              ")])])]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-2 control-label"},[e._v("Introduction")]),e._v(" "),s("div",{staticClass:"col-sm-6"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.introduction,expression:"introduction",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.introduction},on:{input:function(t){t.target.composing||(e.introduction=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),s("div",{staticClass:"form-group"},[s("div",{staticClass:"col-sm-offset-2 col-sm-6"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:e.updateProfile}},[e._v("Apply")])])])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("h2",[t("i",{staticClass:"fa fa-cog"}),this._v(" Update Personal Info.")])}]};var n=s("VU/8")(o,r,!1,function(e){s("Fhik")},"data-v-56fbdfd4",null);t.default=n.exports}});
//# sourceMappingURL=8.bdfccc8b44e4a276bb2b.js.map