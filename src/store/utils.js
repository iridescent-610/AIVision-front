/** Copyright 2020 Zhejiang Lab. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================
*/

export const setIsDialogOpen = function (state, is_dialog_open) {
    state.is_dialog_open = is_dialog_open
}

export const setDialogContent = function (state, dialog_content) {
    state.dialog_content = dialog_content
}

export const closeDialog = function (event) {
    console.log(event);
    this.setIsDialogOpen(false);
    this.setDialogContent("");
}
