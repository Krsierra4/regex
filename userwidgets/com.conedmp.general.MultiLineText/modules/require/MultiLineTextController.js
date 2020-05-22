define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
    },
    initGettersSetters: function () {
    },
    data: {},

    ////////////////////////////////////////////////// Used to set the Text to Area field ////////////////////////////////////////////
    setText: function (text) {
      try {
        kony.print("*****Inside MultiLineTextComponent setText" + JSON.stringify(text));

        let decodedText = general_unescape(text);
        this.view.txtAreaMutiLine.text = decodedText;

        this.data.textareatext = decodedText;
        this.showCount();

      } catch (e) {

        kony.print("Exception found in MultiLineTextComponent setText:::: " + e);

      }
    },


    ////////////////////////////////////////////////// Used to set the data to Text Area field ////////////////////////////////////////////
    setData: function (data) {
      try {
        kony.print("*****Inside MultiLineTextComponent setData" + JSON.stringify(data));

        this.data = data;

        this.view.txtAreaMutiLine.text = data.textareatext;
        this.showCount();

        this.view.txtAreaMutiLine.placeholder = data.placeholder;

        this.view.lblMultiLineText.text = data.labeltext;

      } catch (e) {

        kony.print("Exception found in MultiLineTextComponent setData:::: " + e);

      }
    },

    ////////////////////////////////////////////////// Used to get the data from Text Area field  ////////////////////////////////////////////////

    getData: function () {
      kony.print("*****Inside MultiLineTextComponent setData");

      delete this.data.selectedData;

      try {

        if (this.view.txtAreaMutiLine.text !== null && this.view.txtAreaMutiLine.text.trim() !== null && this.view.txtAreaMutiLine.text.trim().length > 0) {

          this.data.selected = true;

          //this.data["selectedType"] = "multiline";//change later;

          this.data.selectedData = this.view.txtAreaMutiLine.text;

        } else {
          kony.print("data not available in MultiLineTextComponent:::::");

          this.data.selected = false;

        }

        return this.data;

      } catch (exception) {

        kony.print("Exception found in MultiLineTextComponent getData:::: " + exception);

      }
    },
    showError: function (value) {
      this.view.lblError.text = value;
      this.view.lblError.isVisible = true;
      this.view.height = '213dp';
    },

    hideError: function () {
      this.view.lblError.text = "";
      this.view.lblError.isVisible = false;
      this.view.height = '180dp';
      this.showCount();
    },

    showCount: function () {
      if (this.view.txtAreaMutiLine.text.length > 2000) {
        this.view.txtAreaMutiLine.text = this.view.txtAreaMutiLine.text.substr(0, 2000);
      }
      let count = this.view.txtAreaMutiLine.text.length + "/" + "2000";
      this.view.lblCount.text = count;
    },

    onChangeTextCallback: null,
    setOnChangeTextCallback: function (callback) {
      if (callback) {
        this.onChangeTextCallback = callback;
      }
    },
    executeOnChangeTextCallback: function () {
      if (this.onChangeTextCallback && typeof this.onChangeTextCallback === 'function') {
        this.onChangeTextCallback();
      }
    },
    onChangeText: function (eventObject) {
      this.hideError();
      if ((this.view.txtAreaMutiLine.text.length % 25) === 0) {
        this.executeOnChangeTextCallback();
      }
      eventObject.text = general_replaceWithRegExp(eventObject.text); // <-- module general.js
    }
  };
});