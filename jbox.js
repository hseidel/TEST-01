var JX, K;

JX = (function () {
    var

    
    end_mod_variables;

        
        function topClunk() {return new JXClunk() };


        function JXClunk() {
            this.m_Root = {};
            this.m_List = [];
            this.m_Folders = {};
            this.m_SortKey = false
            this.m_ScanCursor = -1;
        };

        function JXView(p_Clunk) {
            this.m_Clunk = p_Clunk;
        };

        JXClunk.prototype = {


            get root() {
                return this.m_Root;
            },

            set root(p_Object) {
                if ((p_Object instanceof Object) && (p_Object != undefined)) {
                    for (prop in p_Object) { this.m_Root[prop] = p_Object[prop] };
                };

            },

            eachItem: function (p_ScanFunction) {
                this.m_List.forEach(p_ScanFunction);
            },

            append: function () {
                var lv_Clunk = new JXClunk();
                this.m_List.push(lv_Clunk);
                return lv_Clunk;
            },

            sortOn: function (p_SortKeyField) {
                var lv_compare = function (p_ItemA, p_ItemB) {
                    var lv_KeyA = p_ItemA.root[p_SortKeyField].toLowerCase();
                    var lv_KeyB = p_ItemB.root[p_SortKeyField].toLowerCase();
                    if (lv_KeyA < lv_KeyB) { return -1 };
                    if (lv_KeyA > lv_KeyB) { return 1 };
                    return 0;
                };

                this.m_List.sort(lv_compare);
            },

            seek: function (p_IndexField, p_IndexValue) {
                if (isTruthy(this.m_List.indexField) && (this.m_List.indexField == p_IndexField)) { return this.m_List.indexMap[p_IndexValue]};
                var lv_IndexMap = {};

                function arrayToMap(p_Item, p_Index, p_List) {
                    var lv_Key = p_Item.root[p_IndexField];
                    lv_IndexMap[lv_Key] = p_Item;
                };
                this.m_List.forEach(arrayToMap);
                this.m_List.indexField = p_IndexValue;
                this.m_List.indexMap = lv_IndexMap;

                return this.m_List.indexMap[p_IndexValue]
            },

            getfolder: function (p_Name) {
                if (this.m_Folders[p_Name] == undefined) this.m_Folders[p_Name] = new JXClunk();
                return this.m_Folders[p_Name];
            },

            clearall: function() {
                this.m_Root = {};
                this.m_List = [];
                this.m_Folders = {};
                this.m_ScanCursor = -1;
            },

  
            JSON: function() {return JSON.stringify(this);},


            toJSON: function () { return { "ROOT": this.m_Root, "LIST": this.m_List, "FOLDERS": this.m_Folders } },

            frJSON: function (p_JSON) {
                var lv_HoldThis = this;
                var lv_TopObject = JSON.parse(p_JSON);
                frObject(lv_TopObject, lv_HoldThis);

                function frObject(p_SourceObject, p_TargetClunk) {
                    if (p_SourceObject.ROOT != undefined) p_TargetClunk.m_Root = p_SourceObject.ROOT;

                    if (p_SourceObject.FOLDERS != undefined) {
                        p_TargetClunk.m_Folders = {};
                        for (lv_Folder in p_SourceObject.FOLDERS) { frObject(p_SourceObject.FOLDERS[lv_Folder], p_TargetClunk.folders(lv_Folder)) };
                    };

                    if (p_SourceObject.LIST != undefined) {
                        p_TargetClunk.m_List = [];
                        p_SourceObject.LIST.forEach(function (lv_SourceItem) { frObject(lv_SourceItem, p_TargetClunk.append()) });
                    };
                };

            }

        };



    //Utility Functions
        function isFalsey(p_Object) {
            if (p_Object === undefined) { return true };
            if (p_Object == null) { return true };
            if (p_Object == false) { return true };
            return false;
        };
        function isTruthy(p_Object) {
            if (p_Object === undefined) { return false };
            if (p_Object == null) { return false };
            if (p_Object == false) { return false };
            return true;
        };

        return {topClunk: topClunk};
})();

/*
scan: function (p_ScanItem ) {
    var lv_lastItem = this.m_List.length - 1;
    if (this.m_ScanCursor <= lv_lastItem) { this.m_ScanCursor++ };
    if (this.m_ScanCursor > lv_lastItem) {
        p_ScanItem = new JXClunk();
        this.m_ScanCursor = -1;  //Reset Scan Cursor
        return false;
    };

    if (this.m_ScanCursor >= 0) {
        p_ScanItem = this.m_List[this.m_ScanCursor];
        return true;
    }
    else {
        p_ScanItem = new JXClunk();
        return false;

    };
},

*/
