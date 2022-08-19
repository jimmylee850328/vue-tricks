<template>
    <div>
        <v-row no-gutters>
            <v-file-input
                label="File input"
                multiple
                id="file-input"
                truncate-length="15"
                @change="read_xlsx_file"
            ></v-file-input>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="write_file()"> 生成檔案 </v-btn>
        </v-row>

        <v-row no-gutters class="mt-2">
            <v-text-field
                label="客戶"
                v-model="client"
                outlined
                class="mr-1"
            ></v-text-field>

            <v-text-field
                label="QTY_start"
                v-model="QTY_start"
                outlined
                class="mr-1"
            ></v-text-field>

            <v-text-field
                label="QTY_end"
                v-model="QTY_end"
                outlined
                class="mr-1"
            ></v-text-field>

            <v-text-field
                label="part_no_start"
                v-model="part_no_start"
                outlined
                class="mr-1"
            ></v-text-field>

            <v-text-field
                label="part_no_end"
                v-model="part_no_end"
                outlined
                class="mr-1"
            ></v-text-field>

            <v-text-field
                label="part_no_start"
                v-model="order_no_start"
                outlined
                class="mr-1"
            ></v-text-field>

            <v-text-field
                label="part_no_end"
                v-model="order_no_end"
                outlined
                class="mr-1"
            ></v-text-field>
        </v-row>

        <v-textarea
            v-model="answer"
            outlined
            height="500"
        >
        </v-textarea>
    </div>
</template>

<script>
    import {readSheetNames} from 'read-excel-file';
    import readXlsxFile from 'read-excel-file';
    import moment from 'moment';

    export default {
        data() {
            return {
                client: "6548",
                order_date: moment().format("YYYY-MM-DD"),
                QTY_start: "KS_21",
                QTY_end: "KT_25",
                part_no_start: "C_21",
                part_no_end: "C_25",
                order_no_start: "B_13",
                order_no_end: "B_14",

                file_json: {},
                sheet_names: [],
                answer: ""
            }
        },

        methods: {
            read_xlsx_file ($event) {
                readSheetNames($event[0]).then((sheetNames) => {
                    sheetNames.forEach((sheetName) => {
                        readXlsxFile($event[0], { sheet: sheetName }).then((rows) => {
                            this.file_json[sheetName] = rows;
                        })
                    });
                })
            },

            get_list (start_str, end_str, diff) {
                let start_col = this.from_letters(start_str.split("_")[0], 1);
                let start_row = +start_str.split("_")[1] - 1;
                let end_col = this.from_letters(end_str.split("_")[0], 1);
                let end_row = +end_str.split("_")[1] - 1;

                let list = [];
                for (let i = start_col; i <= end_col; i++) {
                    for (let j = start_row; j <= end_row; j+=diff) {
                        list.push(`${i}_${j}`);
                    }
                }

                return list;
            },

            write_file () {
                let QTY_list = this.get_list(this.QTY_start, this.QTY_end, 2);
                let part_no_list = this.get_list(this.part_no_start, this.part_no_end, 2);
                let order_no_list = this.get_list(this.order_no_start, this.order_no_end, 1);
                let answer = [];

                for (let i = 0; i < order_no_list.length; i++) {
                    for (let j = 0; j < part_no_list.length; j++) {
                        let part_no_row = part_no_list[j].split("_")[0];
                        let part_no_col = part_no_list[j].split("_")[1];
                        let order_no_row = order_no_list[i].split("_")[0];
                        let order_no_col = order_no_list[i].split("_")[1];
                        let QTY_list_row = QTY_list[order_no_list.length * i + j].split("_")[0];
                        let QTY_list_col = QTY_list[order_no_list.length * i + j].split("_")[1];

                        let part_no = this.file_json['YMMWJ'][part_no_col][part_no_row];
                        let order_no = this.file_json['YMMWJ'][order_no_col][order_no_row].replace("Order No :  ", "");
                        let QTY_info = this.file_json['YMMWJ'][QTY_list_col][QTY_list_row];

                        if (QTY_info != 0)
                            answer.push(`${this.client}\t${this.client}\t${this.order_date}\t${part_no}\t${order_no}\t${QTY_info}`);
                    }
                }

                this.answer = answer.join("\n");
            },

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
                return out - diff;
            },
        },
    };
</script>

<style lang="scss" scoped>


</style>