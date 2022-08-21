<template>
    <div>
        <v-row no-gutters class="mt-2">
            <v-tabs
                v-model="tab"
                align-with-title
            >
                <v-tab
                    v-for="(item, key, index) in param"
                    :key="index"
                >
                    {{ key }}
                </v-tab>
            </v-tabs>
            
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="(item, key, index) in param"
                    :key="index"
                >
                    <v-switch
                        v-model="is_visible"
                        label="我想調整其他參數"
                        class="px-9"
                    ></v-switch>

                    <v-row class="mt-5" no-gutters>
                        <v-col 
                            v-for="(obj, obj_key, index) in item"
                            :key="'obj_' + index"
                            cols="6"
                        >
                            <v-text-field
                                v-show="['start_row', 'end_row', 'future_QTY_end'].includes(obj_key) || is_visible"
                                :label="obj_key"
                                v-model="item[obj_key]"
                                outlined
                                class="mr-1 px-9"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs-items>
        </v-row>

        <hr>

        <v-row no-gutters class="mt-3">
            <v-file-input
                label="請上傳檔案"
                multiple
                id="file-input"
                truncate-length="15"
                @change="read_xlsx_file"
                style="max-width: 300px"
                class="px-9"
            ></v-file-input>
        </v-row>
    </div>
</template>

<script>
    import {readSheetNames} from 'read-excel-file';
    import readXlsxFile from 'read-excel-file';
    import writeXlsxFile from 'write-excel-file';
    import { schema } from '/static/config/YIMM.js';
    import moment from 'moment';

    export default {
        data() {
            return {
                client: "6548",
                order_date: new Date(),
                cut_off_date: null,

                param: {
                    "YMMWJ": {
                        start_row: 21,
                        end_row: 25,

                        QTY_start: "",
                        QTY_end: "",
                        future_QTY_start: "",
                        
                        future_QTY_end: "LI",

                        part_no_start: "C",
                        part_no_end: "C",
                    },
                    "YIMM": {
                        start_row: 19,
                        end_row: 49,

                        QTY_start: "",
                        QTY_end: "",
                        future_QTY_start: "",

                        future_QTY_end: "LO",

                        part_no_start: "C",
                        part_no_end: "C",
                    }
                },
                is_visible: false,
                file_json: {},
                sheet_names: [],
                excel_object: {},
                tab: null
            }
        },

        created () {
            this.init();
        },

        methods: {
            to_letters (num) {
                let mod = num % 26,
                    pow = num / 26 | 0,
                    out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
                return pow ? this.to_letters(pow) + out : out;
            },

            from_letters (str, diff = 0) {
                let out = 0, len = str.length, pos = len;
                while (--pos > -1) {
                    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - 1 - pos);
                }
                return out + diff;
            },
            
            get_first_day_of_month (date, diff, day) {
                let cut_off_date = moment(date).add(diff, 'month').format('YYYY-MM-01');
                let cut_off_month = moment(cut_off_date).get('month') + 1;
                cut_off_date = moment(cut_off_date).day(day);
                if (cut_off_date.get('month') + 1 != cut_off_month) {
                    cut_off_date.add(1, 'week');
                }

                return cut_off_date.format("YYYY-MM-DD");
            },

            init () {
                this.cut_off_date = this.get_first_day_of_month(this.order_date, 2, 2);
                
                let current_date = moment();
                let fixed_date = moment('2022-07-01');
                const months = current_date.diff(fixed_date, 'months');

                this.param.YMMWJ.QTY_start = this.to_letters(this.from_letters("KS", 2 * months));
                this.param.YMMWJ.QTY_end = this.to_letters(this.from_letters("KT", 2 * months));
                this.param.YMMWJ.future_QTY_start = this.to_letters(this.from_letters("KU", 2 * months));

                this.param.YIMM.QTY_start = this.to_letters(this.from_letters("KY", 2 * months));
                this.param.YIMM.QTY_end = this.to_letters(this.from_letters("KZ", 2 * months));
                this.param.YIMM.future_QTY_start = this.to_letters(this.from_letters("LA", 2 * months));
            },

            async read_xlsx_file ($event) {
                this.sheet_names = await readSheetNames($event[0]);
                for (let i = 0; i < this.sheet_names.length; i++) {
                    let sheet_name = this.sheet_names[i];
                    this.file_json[sheet_name] = await readXlsxFile($event[0], { sheet: sheet_name });
                }

                this.write_file();
                this.write_excel_file();
            },

            get_list (origin_start_col, origin_start_row, origin_end_col, origin_end_row, diff) {
                let start_col = this.from_letters(origin_start_col, -1);
                let start_row = origin_start_row - 1;
                let end_col = this.from_letters(origin_end_col, -1);
                let end_row = origin_end_row - 1;

                let list = [];
                for (let i = start_col; i <= end_col; i++) {
                    for (let j = start_row; j <= end_row; j+=diff) {
                        list.push(`${i}_${j}`);
                    }
                }

                return list;
            },

            write_file () {
                this.sheet_names.forEach(sheet_name => {
                    let QTY_list = this.get_list(this.param[sheet_name]['QTY_start'], this.param[sheet_name]['start_row'], this.param[sheet_name]['QTY_end'], this.param[sheet_name]['end_row'], 2);
                    let future_QTY_list = this.get_list(this.param[sheet_name]['future_QTY_start'], this.param[sheet_name]['start_row'], this.param[sheet_name]['future_QTY_end'], this.param[sheet_name]['end_row'], 2);
                    let part_no_list = this.get_list(this.param[sheet_name]['part_no_start'], this.param[sheet_name]['start_row'], this.param[sheet_name]['part_no_end'], this.param[sheet_name]['end_row'], 2);
                    let order_no_list = this.file_json[sheet_name].map(x => x[1]).filter(x => typeof(x) == 'string' && x.includes(":")).map(x => x.split(":")[1].trim());
                    let current_objects = [];
                    let future_objects = [];

                    for (let k = 0; k < QTY_list.length; k++) {
                        let part_no_row = part_no_list[k % part_no_list.length].split("_")[0];
                        let part_no_col = part_no_list[k % part_no_list.length].split("_")[1];
                        let QTY_list_row = QTY_list[k].split("_")[0];
                        let QTY_list_col = QTY_list[k].split("_")[1];

                        let order_no = order_no_list[k % order_no_list.length];
                        let part_no = this.file_json[sheet_name][part_no_col][part_no_row];
                        let QTY_info = this.file_json[sheet_name][QTY_list_col][QTY_list_row];

                        if (QTY_info != 0) {
                            current_objects.push({
                                "client": this.client,
                                "consignee": this.client,
                                "order_date": this.order_date,
                                "part_no": part_no,
                                "order_no": order_no,
                                "QTY": QTY_info,

                                "cut_off_request": new Date(moment(this.cut_off_date).format("YYYY-MM-DD")),
                                "ship_date": new Date(moment(this.cut_off_date).subtract(1, 'day').format("YYYY-MM-DD")),
                                "ETD": new Date(moment(this.cut_off_date).add(7, 'day').format("YYYY-MM-DD")),
                                "ETA": new Date(moment(this.cut_off_date).add(14, 'day').format("YYYY-MM-DD")),
                                "mode": "A",
                                "ship": "S"
                            })
                        }
                    }

                    let start_ETD = this.get_first_day_of_month(this.order_date, 3, 2); // 11/1
                    let count = 0;

                    for (let k = 0; k < future_QTY_list.length; k++) {
                        let part_no_row = part_no_list[k % part_no_list.length].split("_")[0];
                        let part_no_col = part_no_list[k % part_no_list.length].split("_")[1];
                        let QTY_list_row = future_QTY_list[k].split("_")[0];
                        let QTY_list_col = future_QTY_list[k].split("_")[1];

                        let part_no = this.file_json[sheet_name][part_no_col][part_no_row];
                        let QTY_info = this.file_json[sheet_name][QTY_list_col][QTY_list_row];

                        if (k % part_no_list.length == 0 && k != 0) {
                            // N月第一個禮拜二
                            count++;
                            if (count % 2 == 0) {
                                start_ETD = this.get_first_day_of_month(this.order_date, 3 + count / 2, 2);
                            }
                            // N月第三個禮拜二
                            else {
                                start_ETD = moment(start_ETD).add(2, 'week').format("YYYY-MM-DD");
                            }
                        }

                        future_objects.push({
                            "ETD": new Date(moment(start_ETD).add(1, 'week').format("YYYY-MM-DD")),
                            "client": this.client,
                            "part_no": part_no,
                            "QTY": QTY_info,
                        })
                    }

                    this.excel_object[sheet_name] = current_objects;
                    this.excel_object[sheet_name + '_future'] = future_objects;
                });
            },

            write_excel_file () {
                for (let sheet_name in this.excel_object) {
                    let temp_schema = sheet_name.includes("future") ? schema['future'] : schema['current'];
                    writeXlsxFile(this.excel_object[sheet_name], {
                        schema: temp_schema,
                        headerStyle: {
                            backgroundColor: '#deeaf6',
                        },
                        fileName: `${sheet_name}.xlsx`,
                        fontSize: 12
                    });
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep .v-label {
        font-size: 1em
    }

    ::v-deep .v-label--active {
        font-size: 1.25em;
        font-weight: bold;
    }
</style>