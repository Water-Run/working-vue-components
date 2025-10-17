<!--
  标准化页面表格组件
  @author WaterRun
  @date 2025-10-10
-->

<template>
  <div class="md-std-table-container">
    <div class="md-std-table">
      <div class="md-table-header">
        <div class="md-table-title-section">
          <h2 class="md-table-title">{{ displayTableName }}</h2>
          <button
              v-if="hasDescription"
              class="md-info-button md-button-hover-unified"
              @mouseenter="showTooltip"
              @mouseleave="hideTooltip"
              ref="infoButton"
          >
            <img
                src="@material-icons/info_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="表格说明"
                class="md-info-icon"
            />
          </button>
        </div>

        <div class="md-table-function-controls">
          <div class="md-function-group">
            <div
                class="md-function-trigger md-button-hover-unified"
                :class="{
                  'active': isMarkMenuVisible && !isMarkingTemporarilyDisabled,
                  'disabled': isMarkingTemporarilyDisabled
                }"
                @mouseenter="isMarkingTemporarilyDisabled ? (isMarkingDisabled ? showDisabledTooltip($event, '标记功能已被管理员禁用') : null) : onMarkTriggerMouseEnter()"
                @mouseleave="isMarkingTemporarilyDisabled ? (isMarkingDisabled ? hideDisabledTooltip() : null) : onMarkTriggerMouseLeave()"
                :title="isMarkingDisabled ? '标记表(管理员已禁用)' : '标记表'"
                ref="markButton"
            >
              <img
                  src="@material-icons/border_color_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                  alt="标记"
                  class="md-function-icon"
                  :class="{ 'disabled-icon': isMarkingTemporarilyDisabled }"
              />
            </div>
            <transition name="function-popup">
              <div
                  v-if="isMarkMenuVisible && !isMarkingTemporarilyDisabled"
                  class="md-function-popup"
                  ref="markPopup"
                  @mouseenter="onMarkPopupMouseEnter"
                  @mouseleave="onMarkPopupMouseLeave"
              >
                <div class="md-function-item" @click="exportMarkingData">
                  <img
                      src="@material-icons/download_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                      alt="导出标记数据"
                      class="md-function-item-icon"
                  />
                  <span class="md-function-item-text">导出所有标记数据(Python模块)</span>
                </div>
                <div class="md-function-item" @click="clearAllStrikethroughs">
                  <img
                      src="@material-icons/format_strikethrough_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                      alt="清除删除线"
                      class="md-function-item-icon"
                  />
                  <span class="md-function-item-text">清除所有删除线</span>
                </div>
                <div class="md-function-item" @click="clearAllHighlights">
                  <img
                      src="@material-icons/format_ink_highlighter_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                      alt="清除高亮"
                      class="md-function-item-icon"
                  />
                  <span class="md-function-item-text">清除所有高亮</span>
                </div>
                <div class="md-function-item" @click="clearAllMarkings">
                  <img
                      src="@material-icons/format_clear_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                      alt="清除所有标记"
                      class="md-function-item-icon"
                  />
                  <span class="md-function-item-text">清除所有标记</span>
                </div>
              </div>
            </transition>
          </div>

          <div class="md-function-group">
            <div
                class="md-function-trigger md-button-hover-unified"
                :class="{
                  'active': isExportMenuVisible && !isOutputTemporarilyDisabled,
                  'disabled': isOutputTemporarilyDisabled
                }"
                @mouseenter="isOutputTemporarilyDisabled ? (isOutputDisabled ? showDisabledTooltip($event, '导出功能已被管理员禁用') : null) : onExportTriggerMouseEnter()"
                @mouseleave="isOutputTemporarilyDisabled ? (isOutputDisabled ? hideDisabledTooltip() : null) : onExportTriggerMouseLeave()"
                :title="isOutputDisabled ? '导出表(管理员已禁用)' : '导出表'"
                ref="exportButton"
            >
              <img
                  src="@material-icons/file_export_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                  alt="导出"
                  class="md-function-icon"
                  :class="{ 'disabled-icon': isOutputTemporarilyDisabled }"
              />
            </div>
            <transition name="function-popup">
              <div
                  v-if="isExportMenuVisible && !isOutputTemporarilyDisabled"
                  class="md-function-popup md-export-popup"
                  ref="exportPopup"
                  @mouseenter="onExportPopupMouseEnter"
                  @mouseleave="onExportPopupMouseLeave"
              >
                <div class="md-export-scroll">
                  <div class="md-function-item" @click="exportToHTML">
                    <img
                        src="@material-icons/html_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="HTML"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为HTML</span>
                  </div>

                  <div class="md-function-item" @click="exportToMarkdown">
                    <img
                        src="@material-icons/markdown_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="Markdown"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为Markdown</span>
                  </div>

                  <div class="md-function-item" @click="exportToCSV">
                    <img
                        src="@material-icons/csv_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="CSV"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为CSV(Unicode)</span>
                  </div>

                  <div class="md-function-item" @click="exportToText">
                    <img
                        src="@material-icons/text_ad_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="纯文本"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为纯文本</span>
                  </div>

                  <div class="md-function-item" @click="exportToXML">
                    <img
                        src="@material-icons/code_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="XML"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为XML</span>
                  </div>

                  <div class="md-function-item" @click="exportToYML">
                    <img
                        src="@material-icons/format_indent_increase_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="YML"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为YML</span>
                  </div>

                  <div class="md-function-item" @click="exportToTOML">
                    <img
                        src="@material-icons/data_array_100dp_000000.png?inline"
                        alt="TOML"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为TOML</span>
                  </div>

                  <div class="md-function-item" @click="exportToJSON">
                    <img
                        src="@material-icons/file_json_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="JSON"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为JSON</span>
                  </div>

                  <div class="md-function-item" @click="exportToSQL">
                    <img
                        src="@material-icons/database_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                        alt="SQL"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为SQL(包含建表指令)</span>
                  </div>

                  <div class="md-function-item" @click="exportToPython">
                    <img
                        src="@material-icons/data_object_100dp_000000.png?inline"
                        alt="Python字典"
                        class="md-function-item-icon"
                    />
                    <span class="md-function-item-text">导出为字典(Python)</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="md-table-height-controls">
          <div class="md-height-control-group" :class="{ 'disabled-group': isHeightAdjustDisabled }">
            <div
                class="md-height-adjust-trigger md-button-hover-unified"
                :class="{
                  'active': isHeightSliderVisible && !isHeightAdjustDisabled,
                  'disabled': isHeightAdjustDisabled
                }"
                @mouseenter="isHeightAdjustDisabled ? showDisabledTooltip($event, '表高调节已被管理员禁用') : null; onTriggerMouseEnter()"
                @mouseleave="isHeightAdjustDisabled ? hideDisabledTooltip() : onTriggerMouseLeave()"
                :title="isHeightAdjustDisabled ? '表高调节(管理员已禁用)' : '表高调节'"
                ref="resizeButton"
            >
              <img
                  src="@material-icons/tune_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                  alt="调节"
                  class="md-adjust-icon-large"
                  :class="{ 'disabled-icon': isHeightAdjustDisabled }"
              />
            </div>
            <span class="md-height-text" :class="{ 'disabled-text': isHeightAdjustDisabled }">单页展示</span>
            <input
                v-model="heightInputValue"
                class="md-height-input-new"
                :class="{ 'disabled': isHeightAdjustDisabled }"
                type="number"
                min="5"
                max="75"
                step="1"
                :disabled="isHeightAdjustDisabled"
                :title="isHeightAdjustDisabled ? '管理员已禁用表高调节功能' : '表高调节'"
                @focus="handleHeightInputFocus"
                @input="handleHeightInputInput"
                @blur="handleHeightInputBlur"
            />
            <span class="md-height-text" :class="{ 'disabled-text': isHeightAdjustDisabled }">行</span>
          </div>

          <transition name="slider-popup">
            <div
                v-if="isHeightSliderVisible && !isHeightAdjustDisabled"
                class="md-height-slider-popup-new"
                ref="sliderPopup"
                @mouseenter="onPopupMouseEnter"
                @mouseleave="onPopupMouseLeave"
            >
              <div class="md-slider-header">
                <span class="md-slider-title">调整表高(行)</span>
              </div>
              <div class="md-slider-content">
                <div class="md-slider-wrapper">
                  <input
                      type="range"
                      :value="currentSliderIndex"
                      min="0"
                      max="4"
                      step="1"
                      class="md-material-slider"
                      @input="updateTableHeightFromSliderStep"
                      @change="updateTableHeightFromSliderStep"
                  />
                  <div class="md-slider-track-bg"></div>
                  <div class="md-slider-track-active" :style="{ width: sliderProgress + '%' }"></div>
                  <div class="md-slider-thumb" :style="{ left: sliderProgress + '%' }"></div>
                </div>
                <div class="md-slider-labels-dynamic">
            <span
                v-for="(step, index) in heightSteps"
                :key="step"
                :class="getStepClass(step, index)"
                class="md-step-label"
            >
              {{ getStepDisplay(step, index) }}
            </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="md-table-content">
        <div class="md-table-field-header">
          <div
              v-for="field in displayFields"
              :key="field.key"
              class="md-field-cell"
              :class="{
                'md-field-pinned': field.isPinned,
                'md-field-sorted': field.sortState !== 'none',
                'md-field-disabled': isFieldInteractionDisabled,
                'md-field-long-pressing': longPressFieldIndex === field.originalIndex
              }"
              :style="{ flex: `${field.flexGrow} 1 0` }"
              @mousedown="!isFieldInteractionDisabled ? startFieldLongPress(field.originalIndex, $event) : null"
              @mouseup="!isFieldInteractionDisabled ? endFieldLongPress() : null"
              @mouseleave="!isFieldInteractionDisabled ? endFieldLongPress() : null"
              @click="!isFieldInteractionDisabled && !config.disableSort ? cycleSortState(field.originalIndex) : null"
              @contextmenu.prevent="!isFieldInteractionDisabled && !config.disableSort ? clearSort() : null"
              :title="getFieldTooltip(field)"
          >
            <div class="md-field-content">
              <!-- 左侧置顶图标 -->
              <div class="md-field-icon-left">
                <img
                    v-if="field.isPinned"
                    src="@material-icons/keep_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    alt="置顶"
                    class="md-field-icon md-pin-icon"
                />
              </div>

              <!-- 中间标题 -->
              <span class="md-field-title">{{ field.title }}</span>

              <!-- 右侧排序图标 -->
              <div class="md-field-icon-right">
                <img
                    v-if="field.sortState === 'desc'"
                    src="@material-icons/sort_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    alt="降序"
                    class="md-field-icon md-sort-icon"
                />
                <img
                    v-if="field.sortState === 'asc'"
                    src="@material-icons/sort_100dp_000000_FILL0_wght400_GRAD0_opsz48_reverse.png?inline"
                    alt="升序"
                    class="md-field-icon md-sort-icon"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="md-table-data" :style="{ height: dataAreaHeight }">
          <div v-if="shouldShowDataOverlay" class="md-status-overlay md-data-only-overlay">
            <div class="md-status-content">
              <div class="md-status-icon" :class="statusIconClass">
                <img
                    v-if="currentStatus === 'processing'"
                    src="@material-icons/process_chart_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    :alt="statusMainText"
                    class="md-status-image"
                />
                <img
                    v-if="currentStatus === 'loading'"
                    src="@material-icons/table_view_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    :alt="statusMainText"
                    class="md-status-image"
                />
                <img
                    v-if="currentStatus === 'empty'"
                    src="@material-icons/table_eye_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    :alt="statusMainText"
                    class="md-status-image"
                />
                <img
                    v-if="currentStatus === 'error'"
                    src="@material-icons/data_alert_100dp_8C1A10_FILL0_wght400_GRAD0_opsz48.png?inline"
                    :alt="statusMainText"
                    class="md-status-image"
                />
                <img
                    v-if="currentStatus === 'noheader'"
                    src="@material-icons/check_box_outline_blank_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    :alt="statusMainText"
                    class="md-status-image"
                />
                <img
                    v-if="currentStatus === 'pagelimit'"
                    src="@material-icons/backup_table_100dp_000000.png?inline"
                    :alt="statusMainText"
                    class="md-status-image"
                />
              </div>
              <div class="md-status-main">{{ statusMainText }}</div>
              <div class="md-status-sub" v-html="statusSubText"></div>
            </div>
          </div>

          <div
              v-for="row in displayData"
              :key="`${row._rowId}-${forceUpdateTrigger}`"
              class="md-data-row"
              :class="{ 'highlighted': row._highlighted, 'strikethrough': row._strikethrough, 'marking-disabled': isMarkingTemporarilyDisabled }"
              @dblclick="(isMarkingTemporarilyDisabled || config.disableMarking) ? null : toggleHighlight(row)"
              @contextmenu.prevent="(isMarkingTemporarilyDisabled || config.disableMarking) ? null : toggleStrikethrough(row)"
              :title="(isMarkingDisabled || config.disableMarking) ? '管理员已禁用数据行标记功能' : ''"
              v-show="!shouldShowDataOverlay"
          >
            <div
                v-for="field in displayFields"
                :key="field.key"
                class="md-data-cell"
                :class="{ 'md-data-cell-pinned': field.isPinned }"
                :style="{ flex: `${field.flexGrow} 1 0` }"
            >
              {{ row[field.key] || '' }}
            </div>
          </div>

          <div
              v-for="n in emptyRowCount"
              :key="`empty-${n}`"
              class="md-data-row md-empty-row"
              v-show="!shouldShowDataOverlay"
          >
            <div class="md-empty-placeholder">
              <img
                  src="@material-icons/table_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                  alt="空数据"
                  class="md-empty-icon"
              />
              <span class="md-empty-text">占位数据</span>
            </div>
          </div>
        </div>
      </div>

      <div class="md-table-controls-footer">
        <div class="md-table-info">
          <div class="md-status-indicator" :class="statusIndicatorClass"></div>
          <span class="md-status-text">{{ statusText }}</span>
          <span class="md-data-info">{{ statusDetailText }}</span>
        </div>

        <div class="md-footer-center-controls">
          <button
              class="md-guide-button md-button-hover-unified"
              @mouseenter="showAdminTooltip"
              @mouseleave="hideAdminTooltip"
              ref="adminButton"
          >
            <img
                src="@material-icons/admin_panel_settings_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="管理员功能配置"
                class="md-guide-icon"
            />
          </button>

          <button
              class="md-guide-button md-button-hover-unified"
              @mouseenter="showGuideTooltip"
              @mouseleave="hideGuideTooltip"
              ref="guideButton"
          >
            <img
                src="@material-icons/emoji_objects_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="使用指引"
                class="md-guide-icon"
            />
          </button>

          <button
              class="md-guide-button md-button-hover-unified"
              @mouseenter="showModuleTooltip"
              @mouseleave="hideModuleTooltip"
              ref="moduleButton"
          >
            <img
                src="@material-icons/developer_guide_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="模块简述"
                class="md-guide-icon"
            />
          </button>
        </div>

        <div class="md-page-controls">
          <button
              class="md-page-button md-button-hover-unified"
              :disabled="currentPage <= 1 || isGotoTemporarilyDisabled"
              @click="goToPage(1)"
              :title="currentPage <= 1 ? '跳转至最初页: 不可用' : '跳转至最初页'"
          >
            <img
                src="@material-icons/first_page_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="首页"
                class="md-page-icon"
                :class="{ 'disabled-icon': isGotoTemporarilyDisabled }"
            />
          </button>

          <button
              class="md-page-button md-button-hover-unified"
              :disabled="currentPage <= 1 || isGotoTemporarilyDisabled"
              @click="goToPage(currentPage - 1)"
              :title="currentPage <= 1 ? '跳转至上一页: 不可用' : '跳转至上一页'"
          >
            <img
                src="@material-icons/chevron_backward_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="上一页"
                class="md-page-icon"
                :class="{ 'disabled-icon': isGotoTemporarilyDisabled }"
            />
          </button>

          <div class="md-goto-input-container">
            <input
                v-model="gotoPageInput"
                class="md-goto-input"
                :class="{
                  'md-goto-input-wide': gotoInputWidth > 100,
                  'disabled': shouldShowDataOverlay || isGotoTemporarilyDisabled
                }"
                :style="{ width: gotoInputWidth + 'px' }"
                type="text"
                inputmode="numeric"
                :placeholder="gotoPlaceholder"
                :disabled="shouldShowDataOverlay || isGotoTemporarilyDisabled"
                :title="shouldShowDataOverlay ? '数据加载中' : '输入页码进行跳转'"
                @focus="onGotoInputFocus"
                @blur="onGotoInputBlur"
                @input="onGotoInputChange"
                @keydown="handleGotoInputKeydown"
                @keyup.enter="handleGotoPageEnter"
            />
            <div class="md-goto-spinner" :class="{ 'disabled': shouldShowDataOverlay || isGotoTemporarilyDisabled }">
              <button
                  class="md-spinner-button md-spinner-up"
                  :disabled="shouldShowDataOverlay || isGotoTemporarilyDisabled"
                  @click="handleSpinnerClick(1)"
                  :title="shouldShowDataOverlay ? '数据加载中' : '增加页码'"
                  tabindex="-1"
              >
                <img
                    src="@material-icons/keyboard_arrow_up_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    alt="上"
                    class="md-spinner-icon"
                    :class="{ 'disabled-icon': shouldShowDataOverlay || isGotoTemporarilyDisabled }"
                />
              </button>
              <button
                  class="md-spinner-button md-spinner-down"
                  :disabled="shouldShowDataOverlay || isGotoTemporarilyDisabled"
                  @click="handleSpinnerClick(-1)"
                  :title="shouldShowDataOverlay ? '数据加载中' : '减少页码'"
                  tabindex="-1"
              >
                <img
                    src="@material-icons/keyboard_arrow_down_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                    alt="下"
                    class="md-spinner-icon"
                    :class="{ 'disabled-icon': shouldShowDataOverlay || isGotoTemporarilyDisabled }"
                />
              </button>
            </div>
          </div>

          <button
              class="md-goto-button"
              :class="{ 'disabled': shouldShowDataOverlay || totalPages <= 1 || isGotoTemporarilyDisabled }"
              @click="handleGotoPage"
              :disabled="shouldShowDataOverlay || totalPages <= 1 || isGotoTemporarilyDisabled"
              :title="shouldShowDataOverlay ? '数据加载中' : (totalPages <= 1 ? '只有一页，无需跳转' : 'GOTO跳转')"
          >
            <span class="md-goto-text">跳转</span>
            <img
                src="@material-icons/go_to_line_100dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="跳转"
                class="md-goto-icon"
                :class="{ 'disabled-icon': shouldShowDataOverlay || totalPages <= 1 || isGotoTemporarilyDisabled }"
            />
          </button>

          <button
              class="md-page-button md-button-hover-unified"
              :disabled="currentPage >= totalPages || isGotoTemporarilyDisabled"
              @click="goToPage(currentPage + 1)"
              :title="currentPage >= totalPages ? '跳转至下一页: 不可用' : '跳转至下一页'"
          >
            <img
                src="@material-icons/chevron_forward_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="下一页"
                class="md-page-icon"
                :class="{ 'disabled-icon': isGotoTemporarilyDisabled }"
            />
          </button>

          <button
              class="md-page-button md-button-hover-unified"
              :disabled="currentPage >= totalPages || isGotoTemporarilyDisabled"
              @click="goToPage(totalPages)"
              :title="currentPage >= totalPages ? '跳转至最终页: 不可用' : '跳转至最终页'"
          >
            <img
                src="@material-icons/last_page_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="末页"
                class="md-page-icon"
                :class="{ 'disabled-icon': isGotoTemporarilyDisabled }"
            />
          </button>

          <button
              class="md-page-control-info md-button-hover-unified"
              @mouseenter="showPageControlTooltip"
              @mouseleave="hidePageControlTooltip"
              ref="pageControlButton"
          >
            <img
                src="@material-icons/page_control_100dp_000000_FILL0_wght400_GRAD0_opsz48.png?inline"
                alt="页面控制信息"
                class="md-control-info-icon"
            />
          </button>
        </div>
      </div>

      <div v-if="currentStatus === 'narrow'" class="md-status-overlay">
        <div class="md-status-content">
          <div class="md-status-icon">
            <img
                src="@material-icons/compress_100dp_000000_FILL0_wght400_GRAD0_opsz48_90deg.png?inline"
                :alt="statusMainText"
                class="md-status-image"
            />
          </div>
          <div class="md-status-main">{{ statusMainText }}</div>
          <div class="md-status-sub" v-html="statusSubText"></div>
        </div>
      </div>
    </div>
  </div>

  <div
      v-if="tooltipVisible"
      class="md-tooltip"
      :style="tooltipStyle"
  >
    <div class="md-tooltip-content" v-html="displayDescription"></div>
  </div>
  <div
      v-if="pageControlTooltipVisible"
      class="md-tooltip"
      :style="pageControlTooltipStyle"
  >
    <div class="md-tooltip-content">页面跳转控件组:<br/>使用提供的功能执行GOTO跳转</div>
  </div>
  <div
      v-if="adminTooltipVisible"
      class="md-tooltip"
      :style="adminTooltipStyle"
  >
    <div class="md-tooltip-content" v-html="adminTooltipContent"></div>
  </div>
  <div
      v-if="disabledTooltipVisible"
      class="md-tooltip md-disabled-tooltip"
      :style="disabledTooltipStyle"
  >
    <div class="md-tooltip-content" v-html="disabledTooltipContent"></div>
  </div>
  <div
      v-if="guideTooltipVisible"
      class="md-tooltip"
      :style="guideTooltipStyle"
  >
    <div class="md-tooltip-content">
      <i><strong>使用指引:</strong></i><br/>
      • 双击数据行进行高亮标记(再次双击移除)<br/>
      • 右键数据行添加删除线(再次右键移除)<br/>
      • 管理员可配置表的默认行为,禁用表的功能<br/>
      • 长按字段将该字段置顶(再次长按移除).置顶项将称为第一个字段,可由管理员配置缺省置顶<br/>
      • 由于表并无给定主键,标记的主键实现于对所有值求和并取唯一哈希,这意味着如果有多项值完全一致的行,标记也会被"同步"而完全一致<br/>
      • 单击字段以该字段排序数据,以无标记-降序-升序循环,右键清除排序.当数据量较大时,由于排序实现于浏览器的JavaScript中,速度和当前设备性能前相关<br/>
      • 初次排序后,数据将加载至缓存.注意排序是以当前字段进行字符串排序,结果并不总是和预期一致<br/>
      • 导出较多的数据可能需要较长的时间,耐心等待.实现于当前浏览器的JavaScript中,速度和当前设备的性能强相关<br/>
      • 标记信息会保存在本机上,下次打开网页时继续保留;但要保证标记持久化,使用导出所有标记数据的功能<br/>
      • 在GOTO跳转输入框输入跳转页后可以使用回车快捷键执行跳转.使用前确保页面`key.enter`事件没有被覆盖<br/>
      • 导出功能在前端的TypeScript中实现,受浏览器引擎约束:过大数据量表格可能无法导出<br/>
      • 过窄显示约束: 页面宽度小于max(720px,字段数*160px)*倍率时激活.尝试调整页面宽度,或缩放.如果确保在需求宽度下可正常显示,联系系统管理员修改倍率<br/>
      • 表高限制: 5-75行/页<br/>
      • 表页限制: 99999页.当页数溢出时,尝试修改表高.如果表高最大还无法显示,联系系统管理员<br/>
    </div>
  </div>
  <div
      v-if="moduleTooltipVisible"
      class="md-tooltip"
      :style="moduleTooltipStyle"
  >
    <div class="md-tooltip-content">
      <i>Vue标准表格组件<strong>@WaterRun</strong></i><br/>
      <i>一个由Vue+TypeScript实现并挂载在页面中的标准表格组件</i><br/>
      组件从上到下依次为表头域,数据域和控件域<br/>
      表头域从左到右依次为表标题,(可选)表说明,功能子组件(包括标记子组件和导出子组件),表高控件<br/>
      数据域从上到下依次是表头字段和数据段<br/>
      控件域从左到右依次为状态指示器(包括呼吸灯和文本),信息提示件,GOTO跳转控件<br/>
      组件采用Material Design设计风格,并有部分响应式设计<br/>
      使用中遇到任何问题,联系系统管理员<br/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch, nextTick, onUnmounted} from 'vue'
import type {FieldState, StdTableConfig, TableRequestParams, StoredFieldState} from '@/types/stdTable'

interface RowMarking {
  highlighted: boolean
  strikethrough: boolean
}

interface StoredMarkingData {
  [tableId: string]: {
    [rowId: string]: RowMarking
  }
}

const maxPages = 99999

const isHeightSliderVisible = ref<boolean>(false)
const tableHeight = ref<number>(15)
const pendingTableHeight = ref<number>(15)
const currentPage = ref<number>(1)
const gotoPageInput = ref<string>('')
const isGotoInputActive = ref<boolean>(false)
const sliderHoverTimer = ref<number | null>(null)
const isMouseOverTrigger = ref<boolean>(false)
const isMouseOverPopup = ref<boolean>(false)
const pageControlTooltipVisible = ref<boolean>(false)
const pageControlTooltipStyle = ref<any>({})
const pageControlButton = ref<HTMLElement>()
const isMarkMenuVisible = ref<boolean>(false)
const isExportMenuVisible = ref<boolean>(false)
const guideTooltipVisible = ref<boolean>(false)
const guideTooltipStyle = ref<any>({})
const guideButton = ref<HTMLElement>()
const guideButtonLeft = ref<HTMLElement>()
const markButton = ref<HTMLElement>()
const exportButton = ref<HTMLElement>()
const markPopup = ref<HTMLElement>()
const exportPopup = ref<HTMLElement>()
const isMouseOverMarkTrigger = ref<boolean>(false)
const isMouseOverMarkPopup = ref<boolean>(false)
const isMouseOverExportTrigger = ref<boolean>(false)
const isMouseOverExportPopup = ref<boolean>(false)
const markHoverTimer = ref<number | null>(null)
const exportHoverTimer = ref<number | null>(null)

const longPressTimer = ref<number | null>(null)
const longPressFieldIndex = ref<number | null>(null)
const isLongPressing = ref<boolean>(false)

const isProcessing = ref<boolean>(false)
const processingOperation = ref<string>('')

const simpleHash = (str: string): string => {
  let hash = 0
  if (str.length === 0) return hash.toString()
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

const STORAGE_KEY = 'Vue-StdTable-WaterRun'

const currentTableId = ref<string>('')
const markingsStorage = ref<Map<string, RowMarking>>(new Map())
const forceUpdateTrigger = ref<number>(0)
const fieldState = ref<FieldState>({
  pinnedFieldIndex: null,
  sortFieldIndex: null,
  sortOrder: null
})

const FIELD_STATE_KEY = 'Vue-StdTable-FieldState-WaterRun'
const originalFieldsOrder = ref<number[]>([]) // 保存原始字段顺序

const generateTableId = (): string => {
  const tableName = displayTableName.value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')
  const path = window.location.pathname.replace(/[^a-zA-Z0-9\/]/g, '')
  return `${tableName}_${simpleHash(path)}`
}

// 字段状态存储管理
const saveFieldStateToStorage = (): void => {
  try {
    const allFieldData: StoredFieldState = JSON.parse(localStorage.getItem(FIELD_STATE_KEY) || '{}')
    allFieldData[currentTableId.value] = fieldState.value
    localStorage.setItem(FIELD_STATE_KEY, JSON.stringify(allFieldData))
  } catch {
    // 静默处理存储错误
  }
}

const loadFieldStateFromStorage = (): void => {
  try {
    const allFieldData: StoredFieldState = JSON.parse(localStorage.getItem(FIELD_STATE_KEY) || '{}')
    const tableFieldState = allFieldData[currentTableId.value]

    if (tableFieldState) {
      fieldState.value = tableFieldState
    }
  } catch {
  }
}

// 字段重排序通用方法
const reorderFields = (fields: any[], pinnedIndex: number | null): number[] => {
  const fieldIndices = Array.from({length: fields.length}, (_, i) => i)

  if (pinnedIndex !== null && pinnedIndex >= 0 && pinnedIndex < fields.length) {
    // 将置顶字段移到第一位
    const reordered = fieldIndices.filter(i => i !== pinnedIndex)
    return [pinnedIndex, ...reordered]
  }

  return fieldIndices
}

// 数据排序处理函数
const applySortToData = (data: any[], sortFieldIndex: number, sortOrder: 'asc' | 'desc'): any[] => {
  if (sortFieldIndex < 0 || sortFieldIndex >= config.value.fields.length) {
    return data
  }

  return [...data].sort((a, b) => {
    let aValue: any, bValue: any

    const originalFieldIndex = sortFieldIndex
    if (Array.isArray(a)) {
      aValue = a[originalFieldIndex] || ''
      bValue = b[originalFieldIndex] || ''
    } else {
      const aValues = Object.values(a)
      const bValues = Object.values(b)
      aValue = aValues[originalFieldIndex] || ''
      bValue = bValues[originalFieldIndex] || ''
    }

    const aStr = String(aValue).trim()
    const bStr = String(bValue).trim()

    const aNum = parseFloat(aStr)
    const bNum = parseFloat(bStr)

    let comparison = 0
    if (!isNaN(aNum) && !isNaN(bNum)) {
      comparison = aNum - bNum
    } else {
      comparison = aStr.localeCompare(bStr, 'zh-CN', { numeric: true })
    }

    return sortOrder === 'desc' ? -comparison : comparison
  })
}

// 字段交互禁用状态
const isFieldInteractionDisabled = computed<boolean>(() =>
    isProcessing.value || shouldShowDataOverlay.value
)

// 字段工具提示
const getFieldTooltip = (field: any): string => {
  if (isFieldInteractionDisabled.value) {
    return '数据加载中，字段操作暂时不可用'
  }

  const tips = []
  tips.push('长按: 置顶/取消置顶')

  if (!config.value.disableSort) {
    tips.push('单击: 排序切换')
    tips.push('右键: 清除排序')
  }

  if (field.isPinned) {
    tips.push('(当前已置顶)')
  }

  if (field.sortState !== 'none') {
    tips.push(`(当前${field.sortState === 'asc' ? '升序' : '降序'}排序)`)
  }

  return tips.join('\n')
}

// 切换字段置顶状态
const toggleFieldPin = (fieldIndex: number): void => {
  if (isFieldInteractionDisabled.value) return

  if (fieldState.value.pinnedFieldIndex === fieldIndex) {
    // 取消置顶
    fieldState.value.pinnedFieldIndex = null
  } else {
    // 设置置顶
    fieldState.value.pinnedFieldIndex = fieldIndex
  }

  saveFieldStateToStorage()
}

// 清除所有排序
const clearSort = async (): Promise<void> => {
  if (isFieldInteractionDisabled.value || config.value.disableSort) return

  if (fieldState.value.sortFieldIndex !== null) {
    isProcessing.value = true
    processingOperation.value = '清除所有排序'
    currentStatus.value = 'processing'

    try {
      await new Promise(resolve => setTimeout(resolve, 50))

      fieldState.value.sortFieldIndex = null
      fieldState.value.sortOrder = null
      saveFieldStateToStorage()

    } finally {
      isProcessing.value = false
      processingOperation.value = ''
      checkTableStatus()
    }
  }
}

const generateRowId = (row: any): string => {
  let allValues: string = ''

  if (Array.isArray(row)) {
    allValues = row.map(value => String(value || '')).join('|')
  } else {
    allValues = Object.values(row).map(value => String(value || '')).join('|')
  }

  return `content_${simpleHash(allValues)}`
}

const saveToStorage = (): void => {
  try {
    const allData: StoredMarkingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    allData[currentTableId.value] = Object.fromEntries(markingsStorage.value)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData))
  } catch{

  }
}

const loadFromStorage = (): void => {
  try {
    const allData: StoredMarkingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const tableData = allData[currentTableId.value] || {}

    markingsStorage.value = new Map()
    Object.entries(tableData).forEach(([rowId, marking]) => {
      markingsStorage.value.set(rowId, marking)
    })
  } catch  {

  }
}

const getRowMarking = (rowId: string): RowMarking => {
  return markingsStorage.value.get(rowId) || {highlighted: false, strikethrough: false}
}

const setRowMarking = (rowId: string, marking: Partial<RowMarking>): void => {
  const current = getRowMarking(rowId)
  const updated = {...current, ...marking}

  if (!updated.highlighted && !updated.strikethrough) {
    markingsStorage.value.delete(rowId)
  } else {
    markingsStorage.value.set(rowId, updated)
  }

  saveToStorage()
  forceUpdateTrigger.value++
}

const config = ref<StdTableConfig>({
  tableName: '数据表格',
  fields: []
})
const tableData = ref<any[]>([])
const totalCount = ref<number>(0)
const currentStatus = ref<string>('')
const tooltipVisible = ref<boolean>(false)
const tooltipStyle = ref<any>({})
const infoButton = ref<HTMLElement>()
const resizeButton = ref<HTMLElement>()
const sliderPopup = ref<HTMLElement>()
const adminTooltipVisible = ref<boolean>(false)
const adminTooltipStyle = ref<any>({})
const adminButton = ref<HTMLElement>()

const moduleTooltipVisible = ref<boolean>(false)
const moduleTooltipStyle = ref<any>({})
const moduleButton = ref<HTMLElement>()

const heightSteps = [5, 10, 15, 30, 75]
const heightInputValue = ref('')
const isHeightInputFocused = ref(false)
const heightInputDebounceTimer = ref<number | null>(null)

const disabledTooltipVisible = ref<boolean>(false)
const disabledTooltipStyle = ref<any>({})
const disabledTooltipContent = ref<string>('')

const hideDisabledTooltip = (): void => {
  disabledTooltipVisible.value = false
  disabledTooltipContent.value = ''
}

const isMarkingTemporarilyDisabled = computed<boolean>(() =>
    isMarkingDisabled.value || isProcessing.value
)
const isOutputTemporarilyDisabled = computed<boolean>(() =>
    isOutputDisabled.value || isProcessing.value
)
const isGotoTemporarilyDisabled = computed<boolean>(() =>
    isProcessing.value
)

const gotoInputWidth = computed<number>(() => {
  const inputValue = gotoPageInput.value
  const placeholder = gotoPlaceholder.value
  const textToMeasure = inputValue || placeholder

  const getTextWidth = (text: string): number => {
    let width = 0
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      if (/[0-9]/.test(char)) {
        width += 10
      } else if (char === '-') {
        width += 6
      } else {
        width += 12
      }
    }
    return width
  }

  const textWidth = getTextWidth(textToMeasure)
  const padding = 24
  const minWidth = 100
  const maxWidth = 180
  const calculatedWidth = textWidth + padding

  return Math.max(minWidth, Math.min(maxWidth, calculatedWidth))
})

const sliderProgress = computed<number>(() => {
  const index = heightSteps.findIndex(step => step === pendingTableHeight.value)
  if (index >= 0) {
    return (index / (heightSteps.length - 1)) * 100
  } else {
    const value = pendingTableHeight.value
    for (let i = 0; i < heightSteps.length - 1; i++) {
      if (value >= heightSteps[i] && value <= heightSteps[i + 1]) {
        const progress = (value - heightSteps[i]) / (heightSteps[i + 1] - heightSteps[i])
        return ((i + progress) / (heightSteps.length - 1)) * 100
      }
    }
    return 50
  }
})

const processFieldSizes = (fields: any[]): Array<{ title: string, size: number }> => {
  const hasAnySizeValue = fields.some(field => field.size !== undefined && field.size !== null)

  if (!hasAnySizeValue) {
    return fields.map(field => ({
      title: field.title,
      size: 1
    }))
  }

  const totalDefinedSize = fields.reduce((sum, field) => sum + (field.size || 0), 0)
  const undefinedCount = fields.filter(field => field.size === undefined || field.size === null).length

  if (undefinedCount === 0) {
    return fields.map(field => ({
      title: field.title,
      size: field.size
    }))
  }

  const averageSize = (fields.length - totalDefinedSize) / undefinedCount
  const defaultSize = Math.max(averageSize, 0.1)

  return fields.map(field => ({
    title: field.title,
    size: field.size !== undefined && field.size !== null ? field.size : defaultSize
  }))
}

const displayTableName = computed<string>(() => config.value.tableName || '数据表格(缺省)')
const displayFields = computed(() => {
  if (!config.value.fields || !Array.isArray(config.value.fields)) return []

  const processedFields = processFieldSizes(config.value.fields)

  const fieldOrder = reorderFields(processedFields, fieldState.value.pinnedFieldIndex)

  return fieldOrder.map((originalIndex) => {
    const field = processedFields[originalIndex]
    const isPinned = fieldState.value.pinnedFieldIndex === originalIndex
    const isSortField = fieldState.value.sortFieldIndex === originalIndex

    return {
      key: `field_${originalIndex}`,
      title: field.title,
      flexGrow: field.size,
      size: field.size,
      originalIndex,
      isPinned,
      sortState: isSortField ? (fieldState.value.sortOrder || 'none') : 'none'
    }
  })
})

const hasDescription = computed<boolean>(() => (config.value.description || '').length > 0)
const displayDescription = computed<string>(() => config.value.description || '')

const isMarkingDisabled = computed<boolean>(() => config.value.disableMarking === true)
const isOutputDisabled = computed<boolean>(() => config.value.disableOutput === true)
const isHeightAdjustDisabled = computed<boolean>(() => config.value.disableHeightAdjust === true)
const isWidthLimitIgnored = computed<boolean>(() => config.value.ignoreWidthLimit === true)

const calculatedMinWidth = computed<string>(() => {
  const fieldCount = displayFields.value.length
  const ratio = config.value.minWidthRatio || 1.0
  const baseWidth = Math.max(720, fieldCount * 160)
  return `${baseWidth * ratio}px`
})

const dataAreaHeight = computed<string>(() => {
  const rowHeight = 48
  return `${tableHeight.value * rowHeight}px`
})

const displayData = computed(() => {
  forceUpdateTrigger.value

  if (!tableData.value.length) return []

  let sourceData = tableData.value

  if (fieldState.value.sortFieldIndex !== null && fieldState.value.sortOrder) {
    // 有排序：使用缓存的全部数据
    if (cachedFullData.value && cachedFullData.value.length > 0) {
      const sortedAllData = applySortToData(cachedFullData.value, fieldState.value.sortFieldIndex, fieldState.value.sortOrder)

      const startIndex = (currentPage.value - 1) * tableHeight.value
      const endIndex = startIndex + tableHeight.value
      sourceData = sortedAllData.slice(startIndex, endIndex)

      // 更新总数基于排序后数据
      totalCount.value = sortedAllData.length
    }
  } else {
    // 无排序：正常分页逻辑
    if (!window.loadTableData) {
      const allData = window.stdTableConfig?.data ?? []
      const startIndex = (currentPage.value - 1) * tableHeight.value
      const endIndex = startIndex + tableHeight.value
      sourceData = allData.slice(startIndex, endIndex)
      totalCount.value = allData.length
    }
  }

  return sourceData.map((row) => {
    const rowId = generateRowId(row)
    const marking = getRowMarking(rowId)

    const processedRow: any = {}

    if (Array.isArray(row)) {
      displayFields.value.forEach((field) => {
        processedRow[field.key] = row[field.originalIndex] || ''
      })
    } else {
      const values = Object.values(row)
      displayFields.value.forEach((field) => {
        processedRow[field.key] = values[field.originalIndex] || ''
      })
    }

    return {
      ...processedRow,
      _rowId: rowId,
      _highlighted: marking.highlighted,
      _strikethrough: marking.strikethrough
    }
  })
})

// 添加缓存全部数据的变量
const cachedFullData = ref<any[]>([])

const cycleSortState = async (fieldIndex: number): Promise<void> => {
  if (isFieldInteractionDisabled.value || config.value.disableSort) return
  if (isLongPressing.value) return

  isProcessing.value = true
  const fieldTitle = config.value.fields[fieldIndex]?.title || `字段${fieldIndex + 1}`

  try {
    // 获取全部数据用于排序
    if (!cachedFullData.value || cachedFullData.value.length === 0) {
      processingOperation.value = `等待数据加载至内存 `
      currentStatus.value = 'processing'

      cachedFullData.value = await getFullTableData()
    }

    // 设置排序状态
    if (fieldState.value.sortFieldIndex === fieldIndex) {
      if (fieldState.value.sortOrder === 'desc') {
        fieldState.value.sortOrder = 'asc'
        processingOperation.value = `正在以字段 ${fieldTitle} 升序 排序表`
      } else {
        fieldState.value.sortFieldIndex = null
        fieldState.value.sortOrder = null
        processingOperation.value = `正在清除字段 [${fieldTitle}] 的排序`
      }
    } else {
      fieldState.value.sortFieldIndex = fieldIndex
      fieldState.value.sortOrder = 'desc'
      processingOperation.value = `正在以字段 [${fieldTitle}] 降序 排序表`
    }

    currentStatus.value = 'processing'
    await new Promise(resolve => setTimeout(resolve, 200))

    saveFieldStateToStorage()

  } catch (error) {
    currentStatus.value = 'error'
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const emptyRowCount = computed<number>(() => {
  if (shouldShowDataOverlay.value) return 0
  const dataRows = displayData.value.length
  return Math.max(0, tableHeight.value - dataRows)
})

const totalPages = computed<number>(() => {
  return Math.max(1, Math.ceil(totalCount.value / tableHeight.value))
})

const startFieldLongPress = (fieldIndex: number, event: MouseEvent): void => {
  if (isFieldInteractionDisabled.value) return

  event.preventDefault()

  longPressFieldIndex.value = fieldIndex
  isLongPressing.value = false

  if (longPressTimer.value !== null) {
    clearTimeout(longPressTimer.value)
  }

  longPressTimer.value = window.setTimeout(() => {
    if (longPressFieldIndex.value === fieldIndex) {
      isLongPressing.value = true
      toggleFieldPin(fieldIndex)
      if (navigator.vibrate) {
        navigator.vibrate(100)
      }
    }
  }, 750)
}

const endFieldLongPress = (): void => {
  if (longPressTimer.value !== null) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }

  setTimeout(() => {
    longPressFieldIndex.value = null
    isLongPressing.value = false
  }, 200)
}

const statusIconClass = computed<string>(() => {
  return (currentStatus.value === 'loading' || currentStatus.value === 'processing') ? 'breathing' : ''
})

const statusIndicatorClass = computed<string>(() => {
  switch (currentStatus.value) {
    case 'processing':
      return 'breathing-green'
    case 'loading':
      return 'breathing-green'
    case 'error':
      return 'red'
    case 'noheader':
      return 'orange'
    case 'pagelimit':
      return 'orange'
    default:
      return 'green'
  }
})

const statusText = computed<string>(() => {
  switch (currentStatus.value) {
    case 'processing':
      return '操作'
    case 'loading':
      return '加载'
    case 'error':
      return '错误'
    case 'noheader':
      return '警告'
    case 'pagelimit':
      return '警告'
    default:
      return '就绪'
  }
})

const statusDetailText = computed<string>(() => {
  if (currentStatus.value === 'processing') {
    return `正在执行操作 ${processingOperation.value}`
  }
  return `总加载数据: ${totalCount.value}, 当前所处 ${pageStatusText.value} 页`
})

const shouldShowDataOverlay = computed<boolean>(() => {
  return ['loading', 'empty', 'error', 'noheader', 'pagelimit', 'processing'].includes(currentStatus.value)
})

const statusMainText = computed<string>(() => {
  switch (currentStatus.value) {
    case 'processing':
      return '正在执行对应操作'
    case 'narrow':
      return '前端宽度过窄'
    case 'loading':
      return '正在加载数据'
    case 'empty':
      return '未获取任何数据'
    case 'error':
      return '组件出现异常'
    case 'noheader':
      return '未设定合法表头'
    case 'pagelimit':
      return '页数超限'
    default:
      return ''
  }
})

const statusSubText = computed<string>(() => {
  switch (currentStatus.value) {
    case 'processing':
      return '等待页面执行完成<br/>执行速度和当前设备性能强相关<br/>耐心等待,或修改筛选约束减少数据量'
    case 'narrow':
      const ratio = config.value.minWidthRatio || 1.0
      const minWidth = parseInt(calculatedMinWidth.value)
      return `当前表格的宽度窄于设定的最小值:<br/>${minWidth}px(倍率: ${ratio}x)<br/>显示质量无法保证<br/>为避免误读，阻止显示<br/>尝试拉宽页面，或调整缩放<br/>`
    case 'loading':
      return '表格正在更新<br/>等待更新完毕'
    case 'empty':
      return '表格未加载任何有效数据<br/>检查内容本身，或考虑修改加载条件'
    case 'error':
      return '表格组件在运行时出现异常<br/><strong>检查网络连接后，联系系统管理员汇报错误</strong>'
    case 'noheader':
      return '表格组件表头数组构造参数为空<br/>联系系统管理员汇报错误'
    case 'pagelimit':
      return `表格数据总页数超过设定的限制数(${maxPages}页)<br/>考虑增大表高，或调整筛选数据总量`
    default:
      return ''
  }
})

const currentSliderIndex = computed<number>(() => {
  const index = heightSteps.findIndex(step => step === pendingTableHeight.value)
  if (index >= 0) {
    return index
  } else {
    const value = pendingTableHeight.value
    for (let i = 0; i < heightSteps.length - 1; i++) {
      if (value >= heightSteps[i] && value <= heightSteps[i + 1]) {
        return value - heightSteps[i] < heightSteps[i + 1] - value ? i : i + 1
      }
    }
    return 2
  }
})

const pageStatusText = computed<string>(() => {
  if (currentStatus.value.includes('pagelimit')) {
    return ` 页面数溢出(${totalPages.value})`
  }

  if (!currentStatus.value.includes('loading') && (shouldShowDataOverlay.value || !tableData.value.length)) {
    return ' 无可用页面'
  }

  return `${currentPage.value}/${totalPages.value}`
})

const gotoPlaceholder = computed<string>(() => {
  if (!tableData.value.length || totalPages.value >= maxPages) {
    return '不可用'
  }

  return `${currentPage.value}`
})

const getHighlightedStepIndex = (): number => {
  const currentValue = pendingTableHeight.value
  const exactIndex = heightSteps.findIndex(step => step === currentValue)
  if (exactIndex >= 0) {
    return exactIndex
  }

  let closestIndex = 0
  let minDiff = Math.abs(currentValue - heightSteps[0])

  for (let i = 1; i < heightSteps.length; i++) {
    const diff = Math.abs(currentValue - heightSteps[i])
    if (diff < minDiff) {
      minDiff = diff
      closestIndex = i
    }
  }

  return closestIndex
}

const getStepClass = (step: number, index: number): string => {
  const highlightedIndex = getHighlightedStepIndex()
  const currentValue = pendingTableHeight.value

  if (index === highlightedIndex) {
    if (step === currentValue) {
      return 'md-step-current'
    } else {
      return 'md-step-suggested'
    }
  }

  return 'md-step-normal'
}

const getStepDisplay = (step: number, index: number): string => {
  const highlightedIndex = getHighlightedStepIndex()
  const currentValue = pendingTableHeight.value

  if (index === highlightedIndex) {
    if (step === currentValue) {
      return String(currentValue)
    } else {
      return String(currentValue)
    }
  }

  return String(step)
}

const generateFileName = (type: string): string => {
  const tableName = displayTableName.value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')
  const now = new Date()
  const dateTime = now.toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const hash = Math.random().toString(36).substring(2, 8)
  return `${tableName}_${dateTime}_${type}_${hash}`
}

const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const toggleHighlight = (row: any): void => {
  const rowId = row._rowId || generateRowId(row)
  const current = getRowMarking(rowId)
  setRowMarking(rowId, {highlighted: !current.highlighted})
}

const toggleStrikethrough = (row: any): void => {
  const rowId = row._rowId || generateRowId(row)
  const current = getRowMarking(rowId)
  setRowMarking(rowId, {strikethrough: !current.strikethrough})
}

const clearAllHighlights = (): void => {
  let hasChanges = false
  markingsStorage.value.forEach((marking, rowId) => {
    if (marking.highlighted) {
      setRowMarking(rowId, {highlighted: false})
      hasChanges = true
    }
  })
  if (hasChanges) forceUpdateTrigger.value++
  isMarkMenuVisible.value = false
}

const clearAllStrikethroughs = (): void => {
  let hasChanges = false
  markingsStorage.value.forEach((marking, rowId) => {
    if (marking.strikethrough) {
      setRowMarking(rowId, {strikethrough: false})
      hasChanges = true
    }
  })
  if (hasChanges) forceUpdateTrigger.value++
  isMarkMenuVisible.value = false
}

const clearAllMarkings = (): void => {
  let hasChanges = false
  markingsStorage.value.forEach((marking, rowId) => {
    if (marking.highlighted || marking.strikethrough) {
      markingsStorage.value.delete(rowId)
      hasChanges = true
    }
  })
  if (hasChanges) {
    saveToStorage()
    forceUpdateTrigger.value++
  }
  isMarkMenuVisible.value = false
}

const exportMarkingData = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出标记数据'
  currentStatus.value = 'processing'

  try {
    isMarkMenuVisible.value = false

    const highlightedData: any[] = []
    const strikethroughData: any[] = []

    const currentData = displayData.value

    currentData.forEach((row) => {
      const cleanRowData: any = {}

      displayFields.value.forEach((field) => {
        cleanRowData[field.title] = row[field.key] || ''
      })

      if (row._highlighted) {
        highlightedData.push(cleanRowData)
      }

      if (row._strikethrough) {
        strikethroughData.push(cleanRowData)
      }
    })

    const fullData = await getFullTableData()
    if (fullData.length > 0) {
      highlightedData.length = 0
      strikethroughData.length = 0

      fullData.forEach((row) => {
        const rowId = generateRowId(row)
        const marking = markingsStorage.value.get(rowId)

        if (marking) {
          const cleanRowData: any = {}

          if (Array.isArray(row)) {
            displayFields.value.forEach((field, fieldIndex) => {
              cleanRowData[field.title] = row[fieldIndex] || ''
            })
          } else {
            const values = Object.values(row)
            displayFields.value.forEach((field, fieldIndex) => {
              cleanRowData[field.title] = values[fieldIndex] || row[field.key] || ''
            })
          }

          if (marking.highlighted) {
            highlightedData.push(cleanRowData)
          }

          if (marking.strikethrough) {
            strikethroughData.push(cleanRowData)
          }
        }
      })
    }

    const meta = await generateExportMeta()
    const timestamp = new Date().toISOString()

    const content = `"""
标记数据管理模块

Vue标准表格组件的标记数据导出模块，提供高亮和删除线标记数据的面向对象访问。

:author: Vue StdTable@WaterRun
:time: ${timestamp}
:table: ${meta.tableName}
:hash: ${meta.hash}
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Iterator
from dataclasses import dataclass
from datetime import datetime
import json


@dataclass(frozen=True)
class TableMetadata:
    """表格元数据

    Attributes:
        table_name: 表格名称
        export_time: 导出时间
        hash_code: 哈希识别码
        total_count: 总记录数
        fields_info: 字段信息
    """
    table_name: str
    export_time: str
    hash_code: str
    total_count: int
    fields_info: List[Dict[str, str]]


class MarkedRowBase(ABC):
    """标记行数据基类

    为高亮和删除线标记提供统一的数据访问接口。

    使用示例:
        # 访问字段数据
        name = marked_row.get('name')
        age = marked_row.get('age', 0)  # 带默认值

        # 获取所有数据
        all_data = marked_row.data

        # 检查标记类型
        if marked_row.mark_type == 'highlight':
            print("这是高亮行")
    """

    def __init__(self, data: Dict[str, Any]) -> None:
        """初始化标记行

        Args:
            data: 行数据字典
        """
        self._data = data.copy()
        self._mark_time = datetime.now()

    @property
    @abstractmethod
    def mark_type(self) -> str:
        """标记类型: 'highlight' 或 'strikethrough'"""
        ...

    @property
    def data(self) -> Dict[str, Any]:
        """获取所有数据"""
        return self._data.copy()

    @property
    def mark_time(self) -> datetime:
        """标记时间"""
        return self._mark_time

    def get(self, key: str, default: Any = None) -> Any:
        """获取字段值

        Args:
            key: 字段名
            default: 默认值

        Returns:
            字段值或默认值
        """
        return self._data.get(key, default)

    def keys(self) -> List[str]:
        """获取所有字段名"""
        return list(self._data.keys())

    def values(self) -> List[Any]:
        """获取所有字段值"""
        return list(self._data.values())

    def items(self) -> List[tuple[str, Any]]:
        """获取所有字段项"""
        return list(self._data.items())

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            'mark_type': self.mark_type,
            'mark_time': self.mark_time.isoformat(),
            'data': self._data
        }

    def to_json(self, **kwargs) -> str:
        """转换为JSON字符串"""
        return json.dumps(self.to_dict(), ensure_ascii=False, **kwargs)

    def __getitem__(self, key: str) -> Any:
        """支持 row['field'] 语法"""
        return self._data[key]

    def __contains__(self, key: str) -> bool:
        """支持 'field' in row 语法"""
        return key in self._data

    def __len__(self) -> int:
        """数据长度"""
        return len(self._data)

    def __str__(self) -> str:
        """字符串表示"""
        return f"{self.mark_type}标记行({len(self._data)}个字段)"

    def __repr__(self) -> str:
        """详细表示"""
        return f"{self.__class__.__name__}({self._data})"


class HighlightedRow(MarkedRowBase):
    """高亮标记行

    使用示例:
        row = HighlightedRow({'name': '张三', 'age': 25})
        print(row.get('name'))  # 张三
        print(row['age'])       # 25
        print('name' in row)    # True
    """

    @property
    def mark_type(self) -> str:
        return "highlight"


class StrikethroughRow(MarkedRowBase):
    """删除线标记行

    使用示例:
        row = StrikethroughRow({'name': '李四', 'status': '已删除'})
        print(row.get('name'))  # 李四
        print(row['status'])    # 已删除
    """

    @property
    def mark_type(self) -> str:
        return "strikethrough"


class MarkedDataCollection:
    """标记数据集合

    使用示例:
        # 访问数据
        print(f"高亮数据: {len(collection.highlighted)} 行")
        print(f"删除线数据: {len(collection.strikethrough)} 行")

        # 遍历数据
        for row in collection.highlighted:
            print(row.get('name'))

        # 筛选数据
        filtered = collection.filter_highlighted(lambda r: r.get('age', 0) > 18)

        # 导出数据
        collection.save_json('output.json')
    """

    def __init__(self,
                 highlighted_data: List[Dict[str, Any]],
                 strikethrough_data: List[Dict[str, Any]],
                 metadata: TableMetadata) -> None:
        """初始化数据集合

        Args:
            highlighted_data: 高亮数据列表
            strikethrough_data: 删除线数据列表
            metadata: 表格元数据
        """
        self.metadata = metadata
        self.highlighted = [HighlightedRow(row) for row in highlighted_data]
        self.strikethrough = [StrikethroughRow(row) for row in strikethrough_data]

    @property
    def total_count(self) -> int:
        """标记数据总数"""
        return len(self.highlighted) + len(self.strikethrough)

    @property
    def all_marked(self) -> List[MarkedRowBase]:
        """所有标记数据"""
        return self.highlighted + self.strikethrough

    def filter_highlighted(self, predicate) -> List[HighlightedRow]:
        """筛选高亮数据

        Args:
            predicate: 筛选函数，接收HighlightedRow，返回bool

        Returns:
            筛选后的高亮行列表
        """
        return [row for row in self.highlighted if predicate(row)]

    def filter_strikethrough(self, predicate) -> List[StrikethroughRow]:
        """筛选删除线数据"""
        return [row for row in self.strikethrough if predicate(row)]

    def get_field_values(self, field_name: str) -> Dict[str, List[Any]]:
        """获取指定字段的所有值

        Args:
            field_name: 字段名

        Returns:
            包含highlighted和strikethrough两个键的字典
        """
        return {
            'highlighted': [row.get(field_name) for row in self.highlighted],
            'strikethrough': [row.get(field_name) for row in self.strikethrough]
        }

    def export_data(self) -> Dict[str, Any]:
        """导出所有数据"""
        return {
            'metadata': {
                'table_name': self.metadata.table_name,
                'export_time': self.metadata.export_time,
                'hash_code': self.metadata.hash_code,
                'total_count': self.metadata.total_count
            },
            'fields_info': self.metadata.fields_info,
            'statistics': {
                'highlighted_count': len(self.highlighted),
                'strikethrough_count': len(self.strikethrough),
                'total_marked': self.total_count
            },
            'highlighted_data': [row.to_dict() for row in self.highlighted],
            'strikethrough_data': [row.to_dict() for row in self.strikethrough]
        }

    def save_json(self, filename: str, **kwargs) -> None:
        """保存为JSON文件

        Args:
            filename: 文件名
            **kwargs: json.dump的参数
        """
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.export_data(), f, ensure_ascii=False, indent=2, **kwargs)

    def __len__(self) -> int:
        """集合长度"""
        return self.total_count

    def __iter__(self) -> Iterator[MarkedRowBase]:
        """迭代所有标记数据"""
        yield from self.highlighted
        yield from self.strikethrough


# 创建数据实例
metadata = TableMetadata(
    table_name="${meta.tableName}",
    export_time="${meta.exportTime}",
    hash_code="${meta.hash}",
    total_count=${meta.totalCount},
    fields_info=${JSON.stringify(displayFields.value.map(field => ({key: field.key, title: field.title})), null, 4)}
)

# 标记数据
highlighted_data = ${JSON.stringify(highlightedData, null, 4)}
strikethrough_data = ${JSON.stringify(strikethroughData, null, 4)}

# 创建标记数据集合
marked_collection = MarkedDataCollection(highlighted_data, strikethrough_data, metadata)


def main() -> None:
    """输出数据摘要"""
    print("=" * 50)
    print(f"表格: {metadata.table_name}")
    print(f"导出时间: {metadata.export_time}")
    print(f"哈希码: {metadata.hash_code}")
    print("=" * 50)
    print(f"高亮标记: {len(marked_collection.highlighted)} 行")
    print(f"删除线标记: {len(marked_collection.strikethrough)} 行")
    print(f"总标记数: {marked_collection.total_count} 行")
    print("=" * 50)

    # 使用示例
    if marked_collection.highlighted:
        print("高亮数据示例:")
        first_highlighted = marked_collection.highlighted[0]
        for key in first_highlighted.keys()[:3]:  # 显示前3个字段
            print(f"  {key}: {first_highlighted.get(key)}")

    if marked_collection.strikethrough:
        print("删除线数据示例:")
        first_strikethrough = marked_collection.strikethrough[0]
        for key in first_strikethrough.keys()[:3]:  # 显示前3个字段
            print(f"  {key}: {first_strikethrough.get(key)}")


if __name__ == '__main__':
    main()
`

    downloadFile(content, `${generateFileName('MarkingData')}.py`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const getFullTableData = async (): Promise<any[]> => {
  if (!window.loadTableData) {
    return window.stdTableConfig?.data ?? tableData.value
  }

  try {
    const allData: any[] = []
    let currentPage = 1
    const batchSize = 1000
    let hasMore = true

    while (hasMore) {
      const response = await window.loadTableData({
        page: currentPage,
        pageSize: batchSize
      })

      if (response.success && response.data.length > 0) {
        allData.push(...response.data)

        if (response.data.length < batchSize || allData.length >= response.totalCount) {
          hasMore = false
        } else {
          currentPage++
        }
      } else {
        hasMore = false
      }
    }

    return allData

  } catch (error) {
    currentStatus.value = 'error'
    tableData.value = []
    totalCount.value = 0
    throw error
  }
}

const generateExportMeta = async (): Promise<{ exportTime: string, hash: string, tableName: string, totalCount: number }> => {
  const now = new Date()
  const exportTime = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  const hash = Math.random().toString(36).substring(2, 10).toUpperCase()
  return {
    exportTime,
    hash,
    tableName: displayTableName.value,
    totalCount: (await getFullTableData()).length
  }
}

const exportToCSV = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为CSV'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun', `${generateFileName('CSV')}.csv`)
      return
    }

    const headers = displayFields.value.map(field => field.title).join(',')
    const rows = fullData.map(row => {
      if (Array.isArray(row)) {
        return displayFields.value.map((_field, index) => {
          const value = row[index] || ''
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(',')
      } else {
        const values = Object.values(row)
        return displayFields.value.map((_field, index) => {
          const value = values[index] || ''
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(',')
      }
    }).join('\n')
    const content = headers + '\n' + rows
    downloadFile(content, `${generateFileName('CSV')}.csv`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToMarkdown = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为Markdown'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun', `${generateFileName('Markdown')}.md`)
      return
    }

    const meta = await generateExportMeta()
    const headers = '| ' + displayFields.value.map(field => field.title).join(' | ') + ' |'
    const separator = '|' + displayFields.value.map(() => '---').join('|') + '|'
    const rows = fullData.map(row => {
      if (Array.isArray(row)) {
        return '| ' + displayFields.value.map((_field, index) => row[index] || '').join(' | ') + ' |'
      } else {
        const values = Object.values(row)
        return '| ' + displayFields.value.map((_field, index) => values[index] || '').join(' | ') + ' |'
      }
    }).join('\n')

    const content = `# ${meta.tableName}

## 导出信息
- **导出时间**: ${meta.exportTime}
- **哈希识别码**: ${meta.hash}
- **总项目数**: ${meta.totalCount}
- **表名**: ${meta.tableName}

## 数据表格

${headers}
${separator}
${rows}

---
由 Vue标准表格组件@WaterRun 导出 | 组件自动生成的HTML `

    downloadFile(content, `${generateFileName('Markdown')}.md`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToJSON = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为JSON'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('{"error": "导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun"}', `${generateFileName('JSON')}.json`)
      return
    }

    const meta = await generateExportMeta()
    const exportData = {
      meta: {
        tableName: meta.tableName,
        exportTime: meta.exportTime,
        hash: meta.hash,
        totalCount: meta.totalCount,
        fieldsCount: displayFields.value.length,
        exportedBy: "Vue标准表格组件@WaterRun"
      },
      fields: displayFields.value.map(field => ({
        key: field.key,
        title: field.title
      })),
      data: fullData
    }

    const content = JSON.stringify(exportData, null, 2)
    downloadFile(content, `${generateFileName('JSON')}.json`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToHTML = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为HTML'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    const meta = await generateExportMeta()
    if (!fullData.length) {
      downloadFile(`<html><body><h1>导出失败：数据获取异常</h1><p>这最可能是由于数据量过大受浏览器JS引擎限制导致的，或者数据可能为空。使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。<br/>导出的基本信息：${meta.tableName}，${meta.exportTime}，${meta.hash}<br/>Vue 标准表格组件@WaterRun</p></body></html>`, `${generateFileName('HTML')}.html`)
      return
    }

    const headers = displayFields.value.map((field, index) =>
        `<th onclick="sortTable(${index})" style="cursor: pointer; user-select: none;" data-field="${field.key}">
        <div class="th-content">
          <span class="th-title">${field.title}</span>
          <span class="sort-indicator">⇅</span>
        </div>
      </th>`
    ).join('')

    const rows = fullData.map((row, rowIndex) => {
      let cellsHtml = ''
      if (Array.isArray(row)) {
        cellsHtml = displayFields.value.map((_field, index) =>
            `<td><div class="cell-content">${row[index] || ''}</div></td>`
        ).join('')
      } else {
        const values = Object.values(row)
        cellsHtml = displayFields.value.map((_field, index) =>
            `<td><div class="cell-content">${values[index] || ''}</div></td>`
        ).join('')
      }
      return `<tr data-row="${rowIndex}">${cellsHtml}</tr>`
    }).join('\n')

    const fieldOptions = displayFields.value.map((field, index) =>
        `<option value="${index}">${field.title}</option>`
    ).join('')

    const styles = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --bg-primary: #ffffff;
        --bg-secondary: #f5f5f5;
        --bg-tertiary: #eeeeee;
        --bg-accent: #e1e1e1;
        --border-primary: #d1d1d1;
        --border-secondary: #e5e5e5;
        --text-primary: #2d2d2d;
        --text-secondary: #525252;
        --text-muted: #737373;
        --text-disabled: #a3a3a3;
        --accent-color: #404040;
        --accent-hover: #2d2d2d;
        --danger-color: #a85a5a;
        --danger-hover: #8b4848;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
        --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.06);
      }

      body {
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'Consolas', monospace;
        font-size: 12px;
        line-height: 1.4;
        color: var(--text-primary);
        background-color: var(--bg-secondary);
        padding: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .container {
        max-width: 1600px;
        margin: 0 auto;
        background: var(--bg-primary);
        border: 1px solid var(--border-primary);
        box-shadow: var(--shadow-md);
        border-radius: 3px;
        overflow: hidden;
      }

      .header {
        background: linear-gradient(180deg, #f8f8f8 0%, #efefef 100%);
        border-bottom: 1px solid var(--border-primary);
        padding: 14px 18px;
      }

      .header-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 10px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
        letter-spacing: -0.2px;
      }

      .meta-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 10px;
        font-size: 11px;
      }

      .meta-item {
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid #ddd;
        padding: 5px 8px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .meta-label {
        color: var(--text-muted);
        font-weight: 500;
        min-width: 40px;
      }

      .meta-value {
        color: var(--text-primary);
        font-weight: 600;
        font-family: monospace;
      }

      .toolbar {
        padding: 10px 18px;
        background: linear-gradient(180deg, #fafafa 0%, #f1f1f1 100%);
        border-bottom: 1px solid var(--border-secondary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-height: 44px;
      }

      .status-info {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 11px;
        color: var(--text-secondary);
      }

      .record-count {
        font-family: monospace;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .record-number {
        color: var(--text-primary);
        font-weight: 700;
        background: var(--bg-tertiary);
        padding: 2px 6px;
        border-radius: 2px;
        border: 1px solid var(--border-secondary);
      }

      .filter-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 6px 10px;
        background: var(--bg-primary);
        border: 1px solid var(--border-primary);
        border-radius: 2px;
        font-size: 11px;
        color: var(--text-primary);
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        font-weight: 500;
      }

      .filter-toggle:hover {
        background: var(--bg-tertiary);
        border-color: var(--accent-color);
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm);
      }

      .filter-toggle.active {
        background: var(--accent-color);
        color: var(--bg-primary);
        border-color: var(--accent-color);
      }

      .filter-indicator {
        font-size: 9px;
        transition: transform 0.2s ease;
      }

      .filter-toggle.active .filter-indicator {
        transform: rotate(90deg);
      }

      .filter-badge {
        background: var(--text-muted);
        color: var(--bg-primary);
        border-radius: 10px;
        padding: 2px 6px;
        font-size: 9px;
        min-width: 18px;
        text-align: center;
        font-weight: 600;
        line-height: 1.2;
      }

      .filter-toggle.active .filter-badge {
        background: var(--bg-primary);
        color: var(--accent-color);
      }

      .filter-panel {
        background: linear-gradient(180deg, #fcfcfc 0%, #f7f7f7 100%);
        border-bottom: 1px solid var(--border-secondary);
        padding: 16px 18px;
        display: none;
        border-top: 1px solid var(--border-secondary);
      }

      .filter-panel.expanded {
        display: block;
        animation: slideDown 0.2s ease-out;
      }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .filter-form {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }

      .filter-form-label {
        font-size: 11px;
        color: var(--text-secondary);
        font-weight: 500;
        min-width: 32px;
      }

      .filter-form select,
      .filter-form input {
        padding: 5px 8px;
        border: 1px solid var(--border-primary);
        background: var(--bg-primary);
        font-size: 11px;
        font-family: monospace;
        color: var(--text-primary);
        border-radius: 2px;
        transition: all 0.15s ease;
      }

      .filter-form select {
        min-width: 120px;
        cursor: pointer;
      }

      .filter-form input {
        min-width: 180px;
        flex: 1;
        max-width: 240px;
      }

      .filter-form select:focus,
      .filter-form input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(64, 64, 64, 0.1);
      }

      .btn {
        padding: 5px 12px;
        border: 1px solid var(--border-primary);
        background: var(--bg-primary);
        cursor: pointer;
        font-size: 11px;
        color: var(--text-primary);
        border-radius: 2px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        user-select: none;
      }

      .btn:hover {
        background: var(--bg-tertiary);
        border-color: var(--accent-color);
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm);
      }

      .btn:active {
        transform: translateY(0);
        box-shadow: none;
      }

      .btn-primary {
        background: var(--accent-color);
        border-color: var(--accent-color);
        color: var(--bg-primary);
      }

      .btn-primary:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
        transform: translateY(-1px);
      }

      .btn-danger {
        color: var(--danger-color);
        border-color: transparent;
      }

      .btn-danger:hover {
        background: rgba(168, 90, 90, 0.1);
        border-color: var(--danger-color);
        color: var(--danger-hover);
      }

      .filter-list {
        min-height: 24px;
        max-height: 120px;
        overflow-y: auto;
      }

      .filter-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        margin-bottom: 4px;
        background: var(--bg-primary);
        border: 1px solid var(--border-secondary);
        border-radius: 2px;
        font-size: 11px;
        transition: all 0.15s ease;
      }

      .filter-item:last-child {
        margin-bottom: 0;
      }

      .filter-item:hover {
        background: var(--bg-tertiary);
        border-color: var(--border-primary);
      }

      .filter-text {
        font-family: monospace;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .filter-field {
        color: var(--text-secondary);
        font-weight: 500;
      }

      .filter-pattern {
        color: var(--accent-color);
        font-weight: 600;
        background: var(--bg-tertiary);
        padding: 1px 4px;
        border-radius: 2px;
      }

      .filter-controls {
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }

      .empty-filters {
        color: var(--text-disabled);
        font-style: italic;
        font-size: 11px;
        text-align: center;
        padding: 12px;
      }

      .table-container {
        background: var(--bg-primary);
        position: relative;
        height: calc(100vh - 280px);
        min-height: 400px;
        overflow: auto;
        border-bottom: 1px solid var(--border-secondary);
      }

      .table-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .table-container::-webkit-scrollbar-track {
        background: var(--bg-secondary);
      }

      .table-container::-webkit-scrollbar-thumb {
        background: var(--border-primary);
        border-radius: 4px;
      }

      .table-container::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
      }

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-variant-numeric: tabular-nums;
      }

      thead {
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      th {
        background: linear-gradient(180deg, #f0f0f0 0%, #e8e8e8 100%);
        color: var(--text-primary);
        text-align: left;
        font-weight: 600;
        font-size: 11px;
        border-right: 1px solid var(--border-secondary);
        border-bottom: 1px solid var(--border-primary);
        user-select: none;
        transition: all 0.15s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
        position: relative;
      }

      th:last-child {
        border-right: none;
      }

      th:hover {
        background: linear-gradient(180deg, #e8e8e8 0%, #ddd 100%);
      }

      .th-content {
        padding: 8px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
      }

      .th-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sort-indicator {
        color: var(--text-muted);
        font-size: 10px;
        opacity: 0.6;
        transition: all 0.15s ease;
      }

      th:hover .sort-indicator {
        opacity: 1;
        color: var(--text-secondary);
      }

      td {
        border-right: 1px solid var(--border-secondary);
        border-bottom: 1px solid var(--border-secondary);
        font-size: 11px;
        vertical-align: top;
        font-family: monospace;
        color: var(--text-primary);
        line-height: 1.4;
        background: var(--bg-primary);
      }

      td:last-child {
        border-right: none;
      }

      .cell-content {
        padding: 6px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 200px;
      }

      tbody tr:hover {
        background: var(--bg-secondary);
      }

      tbody tr:hover td {
        background: var(--bg-secondary);
      }

      tbody tr:nth-child(even) td {
        background: #fafafa;
      }

      tbody tr:nth-child(even):hover td {
        background: var(--bg-secondary);
      }

      .footer {
        padding: 10px 18px;
        background: linear-gradient(180deg, #f8f8f8 0%, #efefef 100%);
        color: var(--text-muted);
        font-size: 10px;
        text-align: center;
        font-family: monospace;
        border-top: 1px solid var(--border-primary);
      }

      .footer-content {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
      }

      .footer-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .footer-label {
        color: var(--text-disabled);
      }

      .footer-value {
        color: var(--text-secondary);
        font-weight: 500;
      }

      @media (max-width: 1200px) {
        body { padding: 8px; }
        .container { border-radius: 0; }
        .toolbar { flex-direction: column; align-items: stretch; gap: 12px; }
        .status-info { justify-content: space-between; }
        .filter-form { flex-direction: column; align-items: stretch; gap: 8px; }
        .filter-item { flex-direction: column; align-items: stretch; gap: 6px; }
        .th-content { padding: 6px 8px; }
        .cell-content { padding: 4px 8px; max-width: 150px; }
        .footer-content { flex-direction: column; gap: 4px; }
      }`

    const scriptCode = `
      let sortDirection = [];
      let originalData = Array.from(document.querySelectorAll('#tableBody tr'));
      let activeFilters = [];
      let filterIdCounter = 0;
      let filterPanelExpanded = false;

      const fieldNames = [${displayFields.value.map(field => `'${field.title}'`).join(', ')}];

      function sortTable(columnIndex) {
        const table = document.getElementById('tableBody');
        const rows = Array.from(table.querySelectorAll('tr'));

        if (!sortDirection[columnIndex]) sortDirection[columnIndex] = 'asc';
        else sortDirection[columnIndex] = sortDirection[columnIndex] === 'asc' ? 'desc' : 'asc';

        rows.sort((a, b) => {
          const aText = a.cells[columnIndex].querySelector('.cell-content').textContent.trim();
          const bText = b.cells[columnIndex].querySelector('.cell-content').textContent.trim();

          const aNum = parseFloat(aText);
          const bNum = parseFloat(bText);

          let comparison = 0;
          if (!isNaN(aNum) && !isNaN(bNum)) {
            comparison = aNum - bNum;
          } else {
            comparison = aText.localeCompare(bText, 'zh-CN');
          }

          return sortDirection[columnIndex] === 'asc' ? comparison : -comparison;
        });

        document.querySelectorAll('.sort-indicator').forEach((indicator, index) => {
          if (index === columnIndex) {
            indicator.textContent = sortDirection[columnIndex] === 'asc' ? '↑' : '↓';
          } else {
            indicator.textContent = '⇅';
          }
        });

        rows.forEach(row => table.appendChild(row));
      }

      function toggleFilterPanel() {
        filterPanelExpanded = !filterPanelExpanded;
        const panel = document.getElementById('filterPanel');
        const toggle = document.getElementById('filterToggle');

        if (filterPanelExpanded) {
          panel.classList.add('expanded');
          toggle.classList.add('active');
        } else {
          panel.classList.remove('expanded');
          toggle.classList.remove('active');
        }
      }

      function addFilter() {
        const fieldSelect = document.getElementById('filterField');
        const patternInput = document.getElementById('filterPattern');

        const fieldIndex = parseInt(fieldSelect.value);
        const pattern = patternInput.value.trim();

        if (pattern === '') return;

        try {
          new RegExp(pattern, 'i');
        } catch (e) {
          alert('正则表达式语法错误');
          return;
        }

        const filter = {
          id: filterIdCounter++,
          fieldIndex: fieldIndex,
          fieldName: fieldNames[fieldIndex],
          pattern: pattern,
          regex: new RegExp(pattern, 'i')
        };

        activeFilters.push(filter);
        patternInput.value = '';

        updateFilterDisplay();
        applyFilters();
      }

      function removeFilter(filterId) {
        activeFilters = activeFilters.filter(f => f.id !== filterId);
        updateFilterDisplay();
        applyFilters();
      }

      function clearAllFilters() {
        activeFilters = [];
        updateFilterDisplay();
        applyFilters();
      }

      function updateFilterDisplay() {
        const filterList = document.getElementById('filterList');
        const filterBadge = document.getElementById('filterBadge');

        filterBadge.textContent = activeFilters.length;

        if (activeFilters.length === 0) {
          filterList.innerHTML = '<div class="empty-filters">无激活筛选条件</div>';
          return;
        }

        const filtersHtml = activeFilters.map(filter =>
          '<div class="filter-item">' +
            '<div class="filter-text">' +
              '<span class="filter-field">' + filter.fieldName + '</span>' +
              '<span class="filter-pattern">/' + filter.pattern + '/i</span>' +
            '</div>' +
            '<button class="btn btn-danger" onclick="removeFilter(' + filter.id + ')">移除</button>' +
          '</div>'
        ).join('');

        filterList.innerHTML = filtersHtml;
      }

      function applyFilters() {
        let visibleCount = 0;

        originalData.forEach(row => {
          let shouldShow = true;

          for (const filter of activeFilters) {
            const cellText = row.cells[filter.fieldIndex].querySelector('.cell-content').textContent.trim();
            if (!filter.regex.test(cellText)) {
              shouldShow = false;
              break;
            }
          }

          if (shouldShow) {
            row.style.display = '';
            visibleCount++;
          } else {
            row.style.display = 'none';
          }
        });

        document.getElementById('displayCount').textContent = visibleCount;
      }

      document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('filterPattern').addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            addFilter();
          }
        });

        updateFilterDisplay();
      });`

    const htmlContent = [
      '<!DOCTYPE html>',
      '<html lang="zh-CN">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `  <title>${meta.tableName} - 数据视图</title>`,
      '  <style>',
      styles,
      '  </style>',
      '</head>',
      '<body>',
      '  <div class="container">',
      '    <div class="header">',
      `      <h1 class="header-title">${meta.tableName}</h1>`,
      '      <div class="meta-grid">',
      `        <div class="meta-item"><span class="meta-label">导出时间</span><span class="meta-value">${meta.exportTime}</span></div>`,
      `        <div class="meta-item"><span class="meta-label">哈希识别码</span><span class="meta-value">${meta.hash.substring(0, 8)}</span></div>`,
      `        <div class="meta-item"><span class="meta-label">记录数</span><span class="meta-value">${meta.totalCount}</span></div>`,
      `        <div class="meta-item"><span class="meta-label">字段数</span><span class="meta-value">${displayFields.value.length}</span></div>`,
      '      </div>',
      '    </div>',
      '    ',
      '    <div class="toolbar">',
      '      <div class="status-info">',
      '        <div class="record-count">',
      '          <span>显示</span>',
      '          <span class="record-number" id="displayCount">' + meta.totalCount + '</span>',
      '          <span>/ ' + meta.totalCount + ' 条记录</span>',
      '        </div>',
      '      </div>',
      '      <div class="filter-toggle" id="filterToggle" onclick="toggleFilterPanel()">',
      '        <span class="filter-indicator">▶</span>',
      '        <span>筛选器</span>',
      '        <span class="filter-badge" id="filterBadge">0</span>',
      '      </div>',
      '    </div>',
      '    ',
      '    <div class="filter-panel" id="filterPanel">',
      '      <div class="filter-form">',
      '        <span class="filter-form-label">字段</span>',
      '        <select id="filterField">',
      fieldOptions,
      '        </select>',
      '        <span class="filter-form-label">模式</span>',
      '        <input type="text" id="filterPattern" placeholder="正则表达式">',
      '        <button class="btn btn-primary" onclick="addFilter()">添加筛选</button>',
      '      </div>',
      '      ',
      '      <div id="filterList" class="filter-list">',
      '        <div class="empty-filters">无激活筛选条件</div>',
      '      </div>',
      '      ',
      '      <div class="filter-controls">',
      '        <button class="btn" onclick="clearAllFilters()">清除全部</button>',
      '      </div>',
      '    </div>',
      '    ',
      '    <div class="table-container">',
      '      <table id="dataTable">',
      '        <thead>',
      `          <tr>${headers}</tr>`,
      '        </thead>',
      '        <tbody id="tableBody">',
      rows,
      '        </tbody>',
      '      </table>',
      '    </div>',
      '    ',
      '    <div class="footer">',
      '      <div class="footer-content">',
      `        <div class="footer-item"><span class="footer-label">生成工具:</span><span class="footer-value">Vue 标准表格组件@WaterRun</span></div>`,
      `        <div class="footer-item"><span class="footer-label">哈希值:</span><span class="footer-value">${meta.hash}</span></div>`,
      `        <div class="footer-item"><span class="footer-label">导出时间:</span><span class="footer-value">${meta.exportTime}</span></div>`,
      '      </div>',
      '    </div>',
      '  </div>',
      '',
      '  <script>',
      scriptCode,
      '  </' + 'script>',
      '</' + 'body>',
      '</' + 'html>'
    ].join('\n')

    downloadFile(htmlContent, `${generateFileName('HTML')}.html`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToText = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为纯文本'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun', `${generateFileName('Text')}.txt`)
      return
    }

    const meta = await generateExportMeta()
    const headers = displayFields.value.map(field => field.title).join('\t')
    const rows = fullData.map(row => {
      if (Array.isArray(row)) {
        return displayFields.value.map((_field, index) => row[index] || '').join('\t')
      } else {
        const values = Object.values(row)
        return displayFields.value.map((_field, index) => values[index] || '').join('\t')
      }
    }).join('\n')

    const content = `${meta.tableName}
导出时间: ${meta.exportTime}
哈希识别码: ${meta.hash}
总项目数: ${meta.totalCount}

${headers}
${rows}

导出工具: Vue标准表格组件@WaterRun`

    downloadFile(content, `${generateFileName('Text')}.txt`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToXML = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为XML'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('<?xml version="1.0" encoding="UTF-8"?><error>导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun</error>', `${generateFileName('XML')}.xml`)
      return
    }

    const meta = await generateExportMeta()
    const rows = fullData.map(row => {
      const fields = displayFields.value.map((field, index) => {
        const value = Array.isArray(row) ? (row[index] || '') : (Object.values(row)[index] || '')
        return `    <${field.key}>${value}</${field.key}>`
      }).join('\n')
      return `  <row>\n${fields}\n  </row>`
    }).join('\n')

    const content = `<?xml version="1.0" encoding="UTF-8"?>
    <table name="${meta.tableName}">
      <meta>
        <exportTime>${meta.exportTime}</exportTime>
        <hash>${meta.hash}</hash>
        <totalCount>${meta.totalCount}</totalCount>
        <exportedBy>Vue标准表格组件@WaterRun</exportedBy>
      </meta>
      <fields>
    ${displayFields.value.map(field => `    <field key="${field.key}" title="${field.title}"/>`).join('\n')}
      </fields>
      <data>
    ${rows}
      </data>
    </table>`

    downloadFile(content, `${generateFileName('XML')}.xml`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToYML = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为YML'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('error: "导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun"', `${generateFileName('YML')}.yml`)
      return
    }

    const meta = await generateExportMeta()
    const content = `# ${meta.tableName} 数据导出
meta:
tableName: "${meta.tableName}"
exportTime: "${meta.exportTime}"
hash: "${meta.hash}"
totalCount: ${meta.totalCount}
exportedBy: "Vue标准表格组件@WaterRun"

fields:
${displayFields.value.map(field => `  - key: "${field.key}"\n    title: "${field.title}"`).join('\n')}

data:
${fullData.map(row => {
      if (Array.isArray(row)) {
        return '  - ' + displayFields.value.map((field, index) =>
            `${field.key}: "${row[index] || ''}"`
        ).join('\n    ')
      } else {
        const values = Object.values(row)
        return '  - ' + displayFields.value.map((field, index) =>
            `${field.key}: "${values[index] || ''}"`
        ).join('\n    ')
      }
    }).join('\n')}`

    downloadFile(content, `${generateFileName('YML')}.yml`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToTOML = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为TOML'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('error = "导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun"', `${generateFileName('TOML')}.toml`)
      return
    }

    const meta = await generateExportMeta()
    const content = `# ${meta.tableName} 数据导出

[meta]
tableName = "${meta.tableName}"
exportTime = "${meta.exportTime}"
hash = "${meta.hash}"
totalCount = ${meta.totalCount}
exportedBy = "Vue标准表格组件@WaterRun"

${displayFields.value.map(field => `[[fields]]\nkey = "${field.key}"\ntitle = "${field.title}"`).join('\n\n')}

${fullData.map((row) => {
      if (Array.isArray(row)) {
        return `[[data]]\n` + displayFields.value.map((field, index) =>
            `${field.key} = "${row[index] || ''}"`
        ).join('\n')
      } else {
        const values = Object.values(row)
        return `[[data]]\n` + displayFields.value.map((field, index) =>
            `${field.key} = "${values[index] || ''}"`
        ).join('\n')
      }
    }).join('\n\n')}`

    downloadFile(content, `${generateFileName('TOML')}.toml`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToSQL = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为SQL'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('-- 导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun', `${generateFileName('SQL')}.sql`)
      return
    }

    const meta = await generateExportMeta()
    const tableName = meta.tableName.replace(/[^a-zA-Z0-9_]/g, '_')
    const fields = displayFields.value.map(field => `${field.key} VARCHAR(255)`).join(',\n  ')
    const createTable = `-- ${meta.tableName} 数据导出
-- 导出时间: ${meta.exportTime}
-- 哈希识别码: ${meta.hash}
-- 总项目数: ${meta.totalCount}

CREATE TABLE ${tableName} (
${fields}
);

`
    const insertRows = fullData.map(row => {
      const values = displayFields.value.map((_field, index) => {
        const value = Array.isArray(row) ? (row[index] || '') : (Object.values(row)[index] || '')
        return `'${value.toString().replace(/'/g, "''")}'`
      }).join(', ')
      return `INSERT INTO ${tableName} VALUES (${values});`
    }).join('\n')

    const content = createTable + insertRows
    downloadFile(content, `${generateFileName('SQL')}.sql`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const exportToPython = async (): Promise<void> => {
  isProcessing.value = true
  processingOperation.value = '导出表格为Python字典'
  currentStatus.value = 'processing'

  try {
    isExportMenuVisible.value = false

    const fullData = await getFullTableData()
    if (!fullData.length) {
      downloadFile('# 导出失败：数据获取异常\\n\\n这最可能是由于数据为空，或数据量过大受浏览器JS引擎限制导致的。\\n\\n使用页面中提供的由后端实现的导出功能。如果没有，联系系统管理员。\\n\\n(文件的基本信息：表名，时间，哈希识别码)\\n\\nVue 标准表格组件@WaterRun\ndata = []', `${generateFileName('Python')}.py`)
      return
    }

    const meta = await generateExportMeta()
    const content = `# ${meta.tableName} 数据导出
# 导出时间: ${meta.exportTime}
# 哈希识别码: ${meta.hash}
# 总项目数: ${meta.totalCount}
# 导出工具: Vue标准表格组件@WaterRun

meta = {
"tableName": "${meta.tableName}",
"exportTime": "${meta.exportTime}",
"hash": "${meta.hash}",
"totalCount": ${meta.totalCount},
"exportedBy": "Vue标准表格组件@WaterRun"
}

fields = ${JSON.stringify(displayFields.value.map(field => ({key: field.key, title: field.title})), null, 4)}

data = ${JSON.stringify(fullData, null, 4)}`

    downloadFile(content, `${generateFileName('Python')}.py`)
  } finally {
    isProcessing.value = false
    processingOperation.value = ''
    checkTableStatus()
  }
}

const positionFunctionPopup = (trigger: HTMLElement, popup: HTMLElement): void => {
  if (!trigger || !popup) return

  nextTick(() => {
    const buttonRect = trigger.getBoundingClientRect()
    const viewportWidth = window.innerWidth

    popup.style.position = 'fixed'
    popup.style.zIndex = '1100'

    popup.style.visibility = 'hidden'
    popup.style.display = 'block'
    const popupWidth = popup.offsetWidth
    const popupHeight = popup.offsetHeight
    popup.style.visibility = 'visible'

    const buttonCenterX = buttonRect.left + (buttonRect.width / 2)
    let leftPosition = buttonCenterX - (popupWidth / 2)

    if (leftPosition < 100) {
      leftPosition = 100
    }
    if (leftPosition + popupWidth > viewportWidth - 100) {
      leftPosition = viewportWidth - popupWidth - 100
    }

    const wouldOverflowTop = buttonRect.top - popupHeight - 12 < 0

    if (wouldOverflowTop) {
      popup.style.top = `${buttonRect.bottom + 12}px`
    } else {
      popup.style.top = `${buttonRect.top - popupHeight - 12}px`
    }

    popup.style.left = `${leftPosition}px`
  })
}

const onMarkTriggerMouseEnter = (): void => {
  if (isMarkingTemporarilyDisabled.value) return

  isMouseOverMarkTrigger.value = true
  if (markHoverTimer.value !== null) {
    clearTimeout(markHoverTimer.value)
    markHoverTimer.value = null
  }
  showMarkMenu()
}

const onMarkTriggerMouseLeave = (): void => {
  if (isMarkingDisabled.value) {
    hideDisabledTooltip()
    return
  }

  isMouseOverMarkTrigger.value = false
  scheduleMarkHide()
}

const onMarkPopupMouseEnter = (): void => {
  isMouseOverMarkPopup.value = true
  if (markHoverTimer.value !== null) {
    clearTimeout(markHoverTimer.value)
    markHoverTimer.value = null
  }
}

const onMarkPopupMouseLeave = (): void => {
  isMouseOverMarkPopup.value = false
  scheduleMarkHide()
}

const showMarkMenu = (): void => {
  isMarkMenuVisible.value = true
  nextTick(() => {
    if (markButton.value && markPopup.value) {
      positionFunctionPopup(markButton.value, markPopup.value)
    }
  })
}

const scheduleMarkHide = (): void => {
  if (markHoverTimer.value !== null) {
    clearTimeout(markHoverTimer.value)
    markHoverTimer.value = null
  }
  markHoverTimer.value = window.setTimeout(() => {
    if (!isMouseOverMarkTrigger.value && !isMouseOverMarkPopup.value) {
      hideMarkMenu()
    }
  }, 200)
}

const hideMarkMenu = (): void => {
  isMarkMenuVisible.value = false
  isMouseOverMarkTrigger.value = false
  isMouseOverMarkPopup.value = false
  if (markHoverTimer.value !== null) {
    clearTimeout(markHoverTimer.value)
    markHoverTimer.value = null
  }
}

const onExportTriggerMouseEnter = (): void => {
  if (isOutputTemporarilyDisabled.value) return

  isMouseOverExportTrigger.value = true
  if (exportHoverTimer.value !== null) {
    clearTimeout(exportHoverTimer.value)
    exportHoverTimer.value = null
  }
  showExportMenu()
}

const onExportTriggerMouseLeave = (): void => {
  if (isOutputDisabled.value) {
    hideDisabledTooltip()
    return
  }

  isMouseOverExportTrigger.value = false
  scheduleExportHide()
}

const onExportPopupMouseEnter = (): void => {
  isMouseOverExportPopup.value = true
  if (exportHoverTimer.value !== null) {
    clearTimeout(exportHoverTimer.value)
    exportHoverTimer.value = null
  }
}

const onExportPopupMouseLeave = (): void => {
  isMouseOverExportPopup.value = false
  scheduleExportHide()
}

const showExportMenu = (): void => {
  isExportMenuVisible.value = true
  nextTick(() => {
    if (exportButton.value && exportPopup.value) {
      positionFunctionPopup(exportButton.value, exportPopup.value)
    }
  })
}

const scheduleExportHide = (): void => {
  if (exportHoverTimer.value !== null) {
    clearTimeout(exportHoverTimer.value)
    exportHoverTimer.value = null
  }
  exportHoverTimer.value = window.setTimeout(() => {
    if (!isMouseOverExportTrigger.value && !isMouseOverExportPopup.value) {
      hideExportMenu()
    }
  }, 200)
}

const hideExportMenu = (): void => {
  isExportMenuVisible.value = false
  isMouseOverExportTrigger.value = false
  isMouseOverExportPopup.value = false
  if (exportHoverTimer.value !== null) {
    clearTimeout(exportHoverTimer.value)
    exportHoverTimer.value = null
  }
}

const positionSliderPopup = (): void => {
  if (!resizeButton.value || !sliderPopup.value) return

  nextTick(() => {
    const buttonRect = resizeButton.value!.getBoundingClientRect()
    const popup = sliderPopup.value!
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    popup.style.position = 'fixed'

    const buttonCenterX = buttonRect.left + (buttonRect.width / 2)
    let leftPosition = buttonCenterX - (popup.offsetWidth / 2)

    if (leftPosition < 100) {
      leftPosition = 100
    }
    if (leftPosition + popup.offsetWidth > viewportWidth - 100) {
      leftPosition = viewportWidth - popup.offsetWidth - 100
    }

    const spaceAbove = buttonRect.top
    const spaceBelow = viewportHeight - buttonRect.bottom
    const popupHeight = popup.offsetHeight

    if (spaceAbove >= popupHeight + 12 || spaceAbove > spaceBelow) {
      popup.style.top = `${buttonRect.top - popupHeight - 12}px`
    } else {
      popup.style.top = `${buttonRect.bottom + 12}px`
    }

    popup.style.left = `${leftPosition}px`
  })
}

// 统一的表高更新方法
const updateTableHeight = (newHeight: number): void => {
  if (newHeight >= 5 && newHeight <= 75 && newHeight !== tableHeight.value) {
    tableHeight.value = newHeight
    pendingTableHeight.value = newHeight
    currentStatus.value = 'loading'
    tableData.value = []
    loadTableData()
  }
}

// 带验证的更新方法
const updateTableHeightWithValidation = (value: number): void => {
  let validatedValue = value

  // 边界检查和修正
  if (validatedValue < 5) {
    validatedValue = 5
    heightInputValue.value = '5'
  } else if (validatedValue > 75) {
    validatedValue = 75
    heightInputValue.value = '75'
  }

  updateTableHeight(validatedValue)
}

// 输入框聚焦事件
const handleHeightInputFocus = (): void => {
  isHeightInputFocused.value = true
}

// 输入框输入事件处理（防抖）
const handleHeightInputInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  // 如果输入无效，不处理业务逻辑，但允许显示
  if (isNaN(value) || target.value.trim() === '') {
    return
  }

  // 清除之前的定时器
  if (heightInputDebounceTimer.value !== null) {
    clearTimeout(heightInputDebounceTimer.value)
  }

  // 设置防抖定时器
  heightInputDebounceTimer.value = window.setTimeout(() => {
    updateTableHeightWithValidation(value)
    heightInputDebounceTimer.value = null
  }, 500)
}

// 输入框失去焦点事件处理
const handleHeightInputBlur = (): void => {
  isHeightInputFocused.value = false

  const value = parseInt(heightInputValue.value, 10)

  // 清除防抖定时器（因为要立即处理）
  if (heightInputDebounceTimer.value !== null) {
    clearTimeout(heightInputDebounceTimer.value)
    heightInputDebounceTimer.value = null
  }

  // 如果输入无效，恢复到当前表高值
  if (isNaN(value) || heightInputValue.value.trim() === '') {
    heightInputValue.value = tableHeight.value.toString()
    return
  }

  updateTableHeightWithValidation(value)
}

// 滑块更新方法
const updateTableHeightFromSliderStep = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const stepIndex = parseInt(target.value)
  const newHeight = heightSteps[stepIndex]

  updateTableHeight(newHeight)
  // 如果输入框未聚焦，同步更新显示值
  if (!isHeightInputFocused.value) {
    heightInputValue.value = newHeight.toString()
  }
}

const goToPage = (page: number): void => {
  if (page < 1 || page > totalPages.value || isGotoTemporarilyDisabled.value) return
  currentPage.value = page

  gotoPageInput.value = ''

  loadTableData()
}

const onGotoInputFocus = (): void => {
  isGotoInputActive.value = true
}

const onGotoInputBlur = (): void => {
  isGotoInputActive.value = false
}

const onGotoInputChange = (): void => {
  const inputValue = gotoPageInput.value

  if (!inputValue) {
    return
  }

  const numericValue = inputValue.replace(/[^0-9]/g, '')

  if (numericValue !== inputValue) {
    gotoPageInput.value = numericValue
  }
}

const handleSpinnerClick = (direction: number): void => {
  let currentValue = gotoPageInput.value ? parseInt(gotoPageInput.value) : currentPage.value

  if (isNaN(currentValue) || currentValue < 1) {
    currentValue = currentPage.value
  }

  const newValue = direction > 0
      ? Math.min(currentValue + 1, totalPages.value)
      : Math.max(currentValue - 1, 1)

  gotoPageInput.value = newValue.toString()
}

const handleGotoInputKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    handleSpinnerClick(1)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    handleSpinnerClick(-1)
  }
}

const handleGotoPageEnter = (): void => {
  handleGotoPage()
}

const handleGotoPage = (): void => {
  const inputValue = gotoPageInput.value.trim()

  if (!inputValue) {
    isGotoInputActive.value = false
    return
  }

  const targetPage = parseInt(inputValue, 10)
  if (isNaN(targetPage) || targetPage < 1 || targetPage > totalPages.value) {
    isGotoInputActive.value = false
    return
  }

  goToPage(targetPage)
  isGotoInputActive.value = false
}

const hideTooltip = (): void => {
  tooltipVisible.value = false
}

const adminTooltipContent = computed<string>(() => {
  const comment = config.value.adminComment || ''
  const description = config.value.description || ''
  const initialHeight = config.value.initialHeight || 15
  const minWidthRatio = config.value.minWidthRatio || 1.0
  const totalCountValue = config.value.totalCount || 0
  const data = config.value.data || []
  const disableSort = config.value.disableSort
  const dataUrl = config.value.dataUrl || ''

  let content = ''

  if (!description) {
    content += `<strong>构建表时没有表格说明参数.</strong><br/>`
  } else {
    content += `<strong>表格说明:</strong> ${description}<br/>`
  }

  const configDetails: string[] = []

  const hasCustomSize = config.value.fields.some(field => field.size !== undefined && field.size !== null)
  if (hasCustomSize) {
    configDetails.push('字段宽度已独立配置')
  }

  if (initialHeight !== 15) {
    configDetails.push(`表高已设定为${initialHeight}行`)
  }

  if (minWidthRatio !== 1.0) {
    configDetails.push(`宽度倍率已调整为${minWidthRatio}x`)
  }

  if (isWidthLimitIgnored.value) {
    configDetails.push('忽略宽度限制')
  }

  if (configDetails.length > 0) {
    content += `<br/><strong>配置参数:</strong> ${configDetails.join(', ')}<br/><br/>`
  } else {
    content += `<br/><strong>所有配置参数均为默认值.</strong><br/><br/>`
  }

  if (comment) {
    content += `<strong>管理员已配置注释信息:</strong><br/>${comment}<br/><br/>`
  } else {
    content += `<strong>管理员未配置任何注释.</strong><br/><br/>`
  }

  const restrictions: string[] = []
  if (isMarkingDisabled.value) restrictions.push('标记控件')
  if (isOutputDisabled.value) restrictions.push('导出控件')
  if (isHeightAdjustDisabled.value) restrictions.push('高度调节控件')
  if (disableSort) restrictions.push('排序功能')

  if (restrictions.length === 0) {
    content += `<strong>管理员未禁用任何功能.</strong><br/>`
  } else {
    content += `<strong>管理员已禁用:</strong> ${restrictions.join(', ')}<br/>`
  }

  content += `<br/>`

  if (data.length === 0) {
    if (totalCountValue > 0) {
      content += `<strong>使用异步加载模式(总数据量: ${totalCountValue})</strong>`
    } else if (dataUrl) {
      content += `<strong>由空数据构造.数据链不为空.表异步加载.</strong>`
    } else {
      content += `<strong>由空数据构造.数据链也为空.</strong>`
    }
  } else {
    content += `<strong>由非空数据构造(数据量: ${data.length})</strong>`
  }

  return content
})

const showPageControlTooltip = async (): Promise<void> => {
  if (!pageControlButton.value) return
  await nextTick()
  const rect = pageControlButton.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  let leftPosition = rect.left
  const tooltipMaxWidth = 280

  if (leftPosition + tooltipMaxWidth > viewportWidth - 100) {
    leftPosition = viewportWidth - tooltipMaxWidth - 100
  }
  if (leftPosition < 100) {
    leftPosition = 100
  }

  pageControlTooltipStyle.value = {
    position: 'fixed',
    top: `${rect.top - 20}px`,
    left: `${leftPosition}px`,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    maxWidth: '280px',
    minWidth: '180px'
  }
  pageControlTooltipVisible.value = true
}

const hidePageControlTooltip = (): void => {
  pageControlTooltipVisible.value = false
}

const showGuideTooltip = async (): Promise<void> => {
  const activeButton = guideButton.value || guideButtonLeft.value
  if (!activeButton) return
  await nextTick()
  const rect = activeButton.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  let leftPosition = rect.left
  const tooltipMaxWidth = 350

  if (leftPosition + tooltipMaxWidth > viewportWidth - 100) {
    leftPosition = viewportWidth - tooltipMaxWidth - 100
  }
  if (leftPosition < 100) {
    leftPosition = 100
  }

  guideTooltipStyle.value = {
    position: 'fixed',
    top: `${rect.top - 20}px`,
    left: `${leftPosition}px`,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    maxWidth: '350px',
    minWidth: '200px'
  }
  guideTooltipVisible.value = true
}

const hideGuideTooltip = (): void => {
  guideTooltipVisible.value = false
}

const showAdminTooltip = async (): Promise<void> => {
  if (!adminButton.value) return
  await nextTick()
  const rect = adminButton.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  let leftPosition = rect.left
  const tooltipMaxWidth = 320

  if (leftPosition + tooltipMaxWidth > viewportWidth - 100) {
    leftPosition = viewportWidth - tooltipMaxWidth - 100
  }
  if (leftPosition < 100) {
    leftPosition = 100
  }

  adminTooltipStyle.value = {
    position: 'fixed',
    top: `${rect.top - 20}px`,
    left: `${leftPosition}px`,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    maxWidth: '320px',
    minWidth: '200px'
  }
  adminTooltipVisible.value = true
}

const hideAdminTooltip = (): void => {
  adminTooltipVisible.value = false
}

const showModuleTooltip = async (): Promise<void> => {
  if (!moduleButton.value) return
  await nextTick()
  const rect = moduleButton.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  let leftPosition = rect.left
  const tooltipMaxWidth = 320

  if (leftPosition + tooltipMaxWidth > viewportWidth - 100) {
    leftPosition = viewportWidth - tooltipMaxWidth - 100
  }
  if (leftPosition < 100) {
    leftPosition = 100
  }

  moduleTooltipStyle.value = {
    position: 'fixed',
    top: `${rect.top - 20}px`,
    left: `${leftPosition}px`,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    maxWidth: '320px',
    minWidth: '200px'
  }
  moduleTooltipVisible.value = true
}

const hideModuleTooltip = (): void => {
  moduleTooltipVisible.value = false
}

const showTooltip = async (): Promise<void> => {
  if (!hasDescription.value || !infoButton.value) return
  await nextTick()
  const rect = infoButton.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  let leftPosition = rect.left
  const tooltipMaxWidth = 280

  if (leftPosition + tooltipMaxWidth > viewportWidth - 100) {
    leftPosition = viewportWidth - tooltipMaxWidth - 100
  }
  if (leftPosition < 100) {
    leftPosition = 100
  }

  tooltipStyle.value = {
    position: 'fixed',
    top: `${rect.top - 20}px`,
    left: `${leftPosition}px`,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    maxWidth: '280px',
    minWidth: '180px'
  }
  tooltipVisible.value = true
}

const showDisabledTooltip = (event: MouseEvent, message: string): void => {
  const target = event.currentTarget as HTMLElement
  if (!target) return

  const rect = target.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  let leftPosition = rect.left
  const tooltipMaxWidth = 280

  if (leftPosition + tooltipMaxWidth > viewportWidth - 100) {
    leftPosition = viewportWidth - tooltipMaxWidth - 100
  }
  if (leftPosition < 100) {
    leftPosition = 100
  }

  disabledTooltipStyle.value = {
    position: 'fixed',
    top: `${rect.top - 20}px`,
    left: `${leftPosition}px`,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    maxWidth: '280px',
    minWidth: '180px'
  }
  disabledTooltipContent.value = message
  disabledTooltipVisible.value = true
}

const loadTableData = async (): Promise<void> => {
  currentStatus.value = 'loading'

  try {
    if (window.loadTableData) {
      const params: TableRequestParams = {
        page: currentPage.value,
        pageSize: tableHeight.value
      }

      const response = await window.loadTableData(params)

      if (response.success) {
        tableData.value = response.data
        totalCount.value = response.totalCount
        currentPage.value = response.currentPage
      } else {
        tableData.value = []
        totalCount.value = 0
        currentStatus.value = 'error'
        return
      }
    } else {
      if (window.stdTableConfig?.data) {
        tableData.value = window.stdTableConfig.data
        totalCount.value = window.stdTableConfig.totalCount || window.stdTableConfig.data.length
      } else {
        tableData.value = []
        totalCount.value = 0
      }
    }

    checkTableStatus()

  } catch (error) {
    currentStatus.value = 'error'
    if (window.handleTableError) {
      window.handleTableError(error instanceof Error ? error : new Error(String(error)))
    }
  }
}

const checkTableStatus = (): void => {
  if (!displayFields.value.length) {
    currentStatus.value = 'noheader'
    return
  }

  const calculatedTotalPages = Math.ceil(totalCount.value / tableHeight.value)
  if (calculatedTotalPages > maxPages) {
    currentStatus.value = 'pagelimit'
    return
  }

  if (!isWidthLimitIgnored.value) {
    const containerWidth = document.querySelector('.md-std-table-container')?.clientWidth || 0
    const minWidth = parseInt(calculatedMinWidth.value)
    if (containerWidth < minWidth) {
      currentStatus.value = 'narrow'
      return
    }
  }

  if (!tableData.value.length) {
    currentStatus.value = 'empty'
    return
  }

  currentStatus.value = ''
}

const handleResize = (): void => {
  checkTableStatus()
  if (isHeightSliderVisible.value) {
    positionSliderPopup()
  }
  if (isMarkMenuVisible.value && markButton.value && markPopup.value) {
    positionFunctionPopup(markButton.value, markPopup.value)
  }
  if (isExportMenuVisible.value && exportButton.value && exportPopup.value) {
    positionFunctionPopup(exportButton.value, exportPopup.value)
  }
}

const handleClickOutside = (event: MouseEvent): void => {
  if (isHeightSliderVisible.value &&
      sliderPopup.value &&
      !sliderPopup.value.contains(event.target as Node) &&
      !resizeButton.value?.contains(event.target as Node)) {
    isHeightSliderVisible.value = false
  }

  if (isMarkMenuVisible.value &&
      markPopup.value &&
      !markPopup.value.contains(event.target as Node) &&
      !markButton.value?.contains(event.target as Node)) {
    hideMarkMenu()
  }

  if (isExportMenuVisible.value &&
      exportPopup.value &&
      !exportPopup.value.contains(event.target as Node) &&
      !exportButton.value?.contains(event.target as Node)) {
    hideExportMenu()
  }
}

const onTriggerMouseEnter = (): void => {
  if (isHeightAdjustDisabled.value) return

  isMouseOverTrigger.value = true
  if (sliderHoverTimer.value !== null) {
    clearTimeout(sliderHoverTimer.value)
    sliderHoverTimer.value = null
  }
  showHeightSlider()
}

const onTriggerMouseLeave = (): void => {
  if (isHeightAdjustDisabled.value) {
    hideDisabledTooltip()
    return
  }

  isMouseOverTrigger.value = false
  scheduleHide()
}

const onPopupMouseEnter = (): void => {
  isMouseOverPopup.value = true
  if (sliderHoverTimer.value !== null) {
    clearTimeout(sliderHoverTimer.value)
    sliderHoverTimer.value = null
  }
}

const onPopupMouseLeave = (): void => {
  isMouseOverPopup.value = false
  scheduleHide()
}

const showHeightSlider = (): void => {
  isHeightSliderVisible.value = true
  pendingTableHeight.value = tableHeight.value
  nextTick(() => {
    positionSliderPopup()
  })
}

const scheduleHide = (): void => {
  if (sliderHoverTimer.value !== null) {
    clearTimeout(sliderHoverTimer.value)
    sliderHoverTimer.value = null
  }
  sliderHoverTimer.value = window.setTimeout(() => {
    if (!isMouseOverTrigger.value && !isMouseOverPopup.value) {
      hideHeightSlider()
    }
  }, 200)
}

const hideHeightSlider = (): void => {
  isHeightSliderVisible.value = false
  isMouseOverTrigger.value = false
  isMouseOverPopup.value = false
  if (sliderHoverTimer.value !== null) {
    clearTimeout(sliderHoverTimer.value)
    sliderHoverTimer.value = null
  }
}

const reloadData = (params?: Partial<TableRequestParams>): void => {
  if (params?.page) currentPage.value = params.page
  loadTableData()
}

const updateConfig = (newConfig: StdTableConfig): void => {
  config.value = newConfig
  currentPage.value = newConfig.currentPage || 1
  loadTableData()
}

const getState = () => {
  return {
    config: config.value,
    tableData: tableData.value,
    currentStatus: currentStatus.value,
    currentPage: currentPage.value,
    tableHeight: tableHeight.value,
    totalCount: totalCount.value
  }
}

watch(tableHeight, (newValue) => {
  if (!isHeightInputFocused.value) {
    heightInputValue.value = newValue.toString()
  }
})

onMounted(() => {
  currentTableId.value = generateTableId()
  loadFromStorage()

  loadFieldStateFromStorage()

  if (config.value.fields) {
    originalFieldsOrder.value = Array.from({length: config.value.fields.length}, (_, i) => i)
  }

  if (window.stdTableConfig?.initialHeight) {
    const initialHeight = Math.max(5, Math.min(75, window.stdTableConfig.initialHeight))
    tableHeight.value = initialHeight
    pendingTableHeight.value = initialHeight
  } else {
    tableHeight.value = 15
    pendingTableHeight.value = 15
  }

  if (window.stdTableConfig) {
    config.value = window.stdTableConfig
    currentPage.value = window.stdTableConfig.currentPage || 1
  }

  if (!window.loadTableData && window.stdTableConfig?.data) {
    cachedFullData.value = window.stdTableConfig.data
  }

  heightInputValue.value = tableHeight.value.toString()

  loadTableData()
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('beforeunload', saveToStorage)
})

onUnmounted(() => {
  saveToStorage()
  saveFieldStateToStorage()
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('beforeunload', saveToStorage)

  if (sliderHoverTimer.value !== null) {
    clearTimeout(sliderHoverTimer.value)
    sliderHoverTimer.value = null
  }
  if (markHoverTimer.value !== null) {
    clearTimeout(markHoverTimer.value)
    markHoverTimer.value = null
  }
  if (exportHoverTimer.value !== null) {
    clearTimeout(exportHoverTimer.value)
    exportHoverTimer.value = null
  }
  if (longPressTimer.value !== null) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }

  if (heightInputDebounceTimer.value !== null) {
    clearTimeout(heightInputDebounceTimer.value)
    heightInputDebounceTimer.value = null
  }
})

watch(() => window.stdTableConfig, (newConfig) => {
  if (newConfig) {
    config.value = newConfig
    loadTableData()
  }
}, {deep: true})

watch(isHeightSliderVisible, (visible) => {
  if (visible) {
    nextTick(() => {
      positionSliderPopup()
    })
  }
})

defineExpose({
  reloadData,
  updateConfig,
  getState,

  api: (() => {
    // 内部辅助函数
    const getAllDataInternal = async (): Promise<any[]> => {
      try {
        const fullData = await getFullTableData()
        return fullData.map((row: any) => {
          const cleanRow: Record<string, any> = {}
          if (Array.isArray(row)) {
            displayFields.value.forEach((field: any, index: number) => {
              cleanRow[field.title] = row[index] || ''
            })
          } else {
            const values = Object.values(row)
            displayFields.value.forEach((field: any, index: number) => {
              cleanRow[field.title] = values[index] || ''
            })
          }
          return cleanRow
        })
      } catch (error) {
        console.error('获取全部数据失败:', error)
        return []
      }
    }

    // 返回API对象
    return {
      // 数据获取 API
      getCurrentPageData: (): any[] => {
        return displayData.value.map((row: any) => {
          const cleanRow: Record<string, any> = {}
          displayFields.value.forEach((field: any) => {
            cleanRow[field.title] = row[field.key] || ''
          })
          return cleanRow
        })
      },

      getCurrentPageRawData: (): any[] => {
        return displayData.value
      },

      getAllData: getAllDataInternal,

      getMarkedData: async (): Promise<{ highlighted: any[], strikethrough: any[], total: number }> => {
        try {
          const fullData = await getFullTableData()
          const highlightedData: any[] = []
          const strikethroughData: any[] = []

          fullData.forEach((row: any) => {
            const rowId = generateRowId(row)
            const marking = markingsStorage.value.get(rowId)

            if (marking) {
              const cleanRow: Record<string, any> = {}
              if (Array.isArray(row)) {
                displayFields.value.forEach((field: any, index: number) => {
                  cleanRow[field.title] = row[index] || ''
                })
              } else {
                const values = Object.values(row)
                displayFields.value.forEach((field: any, index: number) => {
                  cleanRow[field.title] = values[index] || ''
                })
              }

              if (marking.highlighted) {
                highlightedData.push(cleanRow)
              }
              if (marking.strikethrough) {
                strikethroughData.push(cleanRow)
              }
            }
          })

          return {
            highlighted: highlightedData,
            strikethrough: strikethroughData,
            total: highlightedData.length + strikethroughData.length
          }
        } catch (error) {
          console.error('获取标记数据失败:', error)
          return { highlighted: [], strikethrough: [], total: 0 }
        }
      },

      getFilteredData: async (): Promise<any[]> => {
        try {
          if (fieldState.value.sortFieldIndex !== null && fieldState.value.sortOrder) {
            const fullData = await getFullTableData()
            const sortedData = applySortToData(fullData, fieldState.value.sortFieldIndex, fieldState.value.sortOrder)

            return sortedData.map((row: any) => {
              const cleanRow: Record<string, any> = {}
              if (Array.isArray(row)) {
                displayFields.value.forEach((field: any, index: number) => {
                  cleanRow[field.title] = row[index] || ''
                })
              } else {
                const values = Object.values(row)
                displayFields.value.forEach((field: any, index: number) => {
                  cleanRow[field.title] = values[index] || ''
                })
              }
              return cleanRow
            })
          } else {
            return await getAllDataInternal()
          }
        } catch (error) {
          console.error('获取筛选数据失败:', error)
          return []
        }
      },

      // 状态获取 API
      getTableStatus: (): Record<string, any> => {
        return {
          currentPage: currentPage.value,
          totalPages: totalPages.value,
          pageSize: tableHeight.value,
          totalCount: totalCount.value,
          status: currentStatus.value,
          isLoading: currentStatus.value === 'loading',
          isError: currentStatus.value === 'error',
          isProcessing: isProcessing.value
        }
      },

      getFieldsInfo: (): Record<string, any> => {
        return {
          original: config.value.fields,
          display: displayFields.value,
          pinned: fieldState.value.pinnedFieldIndex,
          sorted: fieldState.value.sortFieldIndex !== null ? {
            fieldIndex: fieldState.value.sortFieldIndex,
            order: fieldState.value.sortOrder,
            fieldName: config.value.fields?.[fieldState.value.sortFieldIndex]?.title
          } : null
        }
      },

      getMarkingStats: (): Record<string, number> => {
        let highlightedCount = 0
        let strikethroughCount = 0

        markingsStorage.value.forEach((marking: any) => {
          if (marking.highlighted) highlightedCount++
          if (marking.strikethrough) strikethroughCount++
        })

        return {
          highlighted: highlightedCount,
          strikethrough: strikethroughCount,
          total: highlightedCount + strikethroughCount
        }
      },

      getConfig: (): Record<string, any> => {
        return {
          ...config.value,
          tableId: currentTableId.value,
          fieldState: fieldState.value
        }
      },

      // 基础操作 API
      gotoPage: (page: number): boolean => {
        if (page >= 1 && page <= totalPages.value) {
          goToPage(page)
          return true
        }
        return false
      },

      setTableHeight: (height: number): boolean => {
        if (height >= 5 && height <= 75) {
          updateTableHeight(height)
          return true
        }
        return false
      },

      reload: (params: Record<string, any> = {}): void => {
        reloadData(params)
      },

      // 标记操作 API
      clearAllMarks: (): boolean => {
        try {
          clearAllMarkings()
          return true
        } catch (error) {
          console.error('清除标记失败:', error)
          return false
        }
      },

      clearHighlights: (): boolean => {
        try {
          clearAllHighlights()
          return true
        } catch (error) {
          return false
        }
      },

      clearStrikethroughs: (): boolean => {
        try {
          clearAllStrikethroughs()
          return true
        } catch (error) {
          return false
        }
      },

      markRow: (rowIndex: number, type: string = 'highlight'): boolean => {
        try {
          const row = displayData.value[rowIndex]
          if (!row) return false

          if (type === 'highlight') {
            toggleHighlight(row)
          } else if (type === 'strikethrough') {
            toggleStrikethrough(row)
          }
          return true
        } catch (error) {
          return false
        }
      },

      // 字段操作 API
      pinField: (fieldIndex: number): boolean => {
        try {
          if (fieldIndex >= 0 && fieldIndex < config.value.fields.length) {
            toggleFieldPin(fieldIndex)
            return true
          }
          return false
        } catch (error) {
          return false
        }
      },

      sortByField: (fieldIndex: number, order: string = 'desc'): boolean => {
        try {
          if (fieldIndex >= 0 && fieldIndex < config.value.fields.length) {
            fieldState.value.sortFieldIndex = fieldIndex
            fieldState.value.sortOrder = order as 'asc' | 'desc'
            saveFieldStateToStorage()
            return true
          }
          return false
        } catch (error) {
          return false
        }
      },

      clearSort: (): boolean => {
        try {
          clearSort()
          return true
        } catch (error) {
          return false
        }
      },

      // 导出 API
      exportData: async (format: string): Promise<boolean> => {
        try {
          const formatMap: Record<string, () => Promise<void>> = {
            'csv': exportToCSV,
            'json': exportToJSON,
            'html': exportToHTML,
            'markdown': exportToMarkdown,
            'xml': exportToXML,
            'yml': exportToYML,
            'toml': exportToTOML,
            'sql': exportToSQL,
            'python': exportToPython,
            'text': exportToText
          }

          const exportFunction = formatMap[format.toLowerCase()]
          if (exportFunction) {
            await exportFunction()
            return true
          } else {
            console.error('不支持的导出格式:', format)
            return false
          }
        } catch (error) {
          console.error('导出失败:', error)
          return false
        }
      },

      exportMarkingData: async (): Promise<boolean> => {
        try {
          await exportMarkingData()
          return true
        } catch (error) {
          return false
        }
      },

      // 查询 API
      queryData: async (predicate: (row: any) => boolean): Promise<any[]> => {
        try {
          const allData = await getAllDataInternal()
          return allData.filter(predicate)
        } catch (error) {
          console.error('查询数据失败:', error)
          return []
        }
      },

      getUniqueValues: async (fieldName: string): Promise<any[]> => {
        try {
          const allData = await getAllDataInternal()
          const values = allData.map((row: any) => row[fieldName]).filter((value: any) => value !== undefined && value !== null && value !== '')
          return [...new Set(values)]
        } catch (error) {
          console.error('获取唯一值失败:', error)
          return []
        }
      },

      getFieldStats: async (fieldName: string): Promise<Record<string, any> | null> => {
        try {
          const allData = await getAllDataInternal()
          const values = allData.map((row: any) => row[fieldName]).filter((value: any) => value !== undefined && value !== null && value !== '')

          const numericValues = values.map((v: any) => parseFloat(v)).filter((v: number) => !isNaN(v))

          return {
            total: values.length,
            unique: new Set(values).size,
            hasNumeric: numericValues.length > 0,
            numeric: numericValues.length > 0 ? {
              min: Math.min(...numericValues),
              max: Math.max(...numericValues),
              avg: numericValues.reduce((a: number, b: number) => a + b, 0) / numericValues.length,
              sum: numericValues.reduce((a: number, b: number) => a + b, 0)
            } : null
          }
        } catch (error) {
          console.error('获取字段统计失败:', error)
          return null
        }
      },

      searchInField: async (fieldName: string, searchTerm: string, caseSensitive: boolean = false): Promise<any[]> => {
        try {
          const allData = await getAllDataInternal()
          const searchValue = caseSensitive ? searchTerm : searchTerm.toLowerCase()

          return allData.filter((row: any) => {
            const fieldValue = row[fieldName]
            if (fieldValue === undefined || fieldValue === null) return false

            const compareValue = caseSensitive ? fieldValue.toString() : fieldValue.toString().toLowerCase()
            return compareValue.includes(searchValue)
          })
        } catch (error) {
          return []
        }
      },

      // 存储管理 API
      clearLocalStorage: (): boolean => {
        try {
          localStorage.removeItem(STORAGE_KEY)
          localStorage.removeItem(FIELD_STATE_KEY)
          markingsStorage.value.clear()
          fieldState.value = {
            pinnedFieldIndex: null,
            sortFieldIndex: null,
            sortOrder: null
          }
          forceUpdateTrigger.value++
          return true
        } catch (error) {
          return false
        }
      },

      clearMarkingStorage: (): boolean => {
        try {
          const allData: Record<string, any> = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
          delete allData[currentTableId.value]
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allData))
          markingsStorage.value.clear()
          forceUpdateTrigger.value++
          return true
        } catch (error) {
          return false
        }
      },

      clearFieldStateStorage: (): boolean => {
        try {
          const allFieldData: Record<string, any> = JSON.parse(localStorage.getItem(FIELD_STATE_KEY) || '{}')
          delete allFieldData[currentTableId.value]
          localStorage.setItem(FIELD_STATE_KEY, JSON.stringify(allFieldData))
          fieldState.value = {
            pinnedFieldIndex: null,
            sortFieldIndex: null,
            sortOrder: null
          }
          return true
        } catch (error) {
          return false
        }
      },

      getStorageInfo: (): Record<string, any> | null => {
        try {
          const markingData = localStorage.getItem(STORAGE_KEY)
          const fieldData = localStorage.getItem(FIELD_STATE_KEY)

          return {
            markingSize: markingData ? markingData.length : 0,
            fieldStateSize: fieldData ? fieldData.length : 0,
            totalSize: (markingData?.length || 0) + (fieldData?.length || 0),
            currentTableMarks: markingsStorage.value.size,
            currentTableId: currentTableId.value
          }
        } catch (error) {
          return null
        }
      },

      // 超控操作 API
      override: {
        enableMarking: (): boolean => {
          const originalDisabled = config.value.disableMarking
          config.value.disableMarking = false
          return originalDisabled || false
        },

        enableOutput: (): boolean => {
          const originalDisabled = config.value.disableOutput
          config.value.disableOutput = false
          return originalDisabled || false
        },

        enableHeightAdjust: (): boolean => {
          const originalDisabled = config.value.disableHeightAdjust
          config.value.disableHeightAdjust = false
          return originalDisabled || false
        },

        enableSort: (): boolean => {
          const originalDisabled = config.value.disableSort
          config.value.disableSort = false
          return originalDisabled || false
        },

        ignoreWidthLimit: (): boolean => {
          const originalIgnored = config.value.ignoreWidthLimit
          config.value.ignoreWidthLimit = true
          checkTableStatus()
          return !originalIgnored
        },

        enableAll: (): Record<string, any> => {
          const original = {
            disableMarking: config.value.disableMarking,
            disableOutput: config.value.disableOutput,
            disableHeightAdjust: config.value.disableHeightAdjust,
            disableSort: config.value.disableSort,
            ignoreWidthLimit: config.value.ignoreWidthLimit
          }

          config.value.disableMarking = false
          config.value.disableOutput = false
          config.value.disableHeightAdjust = false
          config.value.disableSort = false
          config.value.ignoreWidthLimit = true

          checkTableStatus()
          return original
        },

        restoreConfig: (originalConfig: Record<string, any>): void => {
          if (originalConfig) {
            Object.assign(config.value, originalConfig)
            checkTableStatus()
          }
        },

        forceTableHeight: (height: number): boolean => {
          if (height >= 1 && height <= 100) {
            tableHeight.value = height
            pendingTableHeight.value = height
            heightInputValue.value = height.toString()
            return true
          }
          return false
        },

        forcePageSize: function(size: number): boolean {
          return this.forceTableHeight(size)
        },

        bypassProcessingLock: (): void => {
          isProcessing.value = false
          processingOperation.value = ''
          currentStatus.value = ''
          checkTableStatus()
        }
      },

      // 高级功能 API
      advanced: {
        getRawConfig: (): Record<string, any> => config.value,

        setRawConfig: (newConfig: Record<string, any>): void => {
          config.value = { ...config.value, ...newConfig }
          checkTableStatus()
        },

        getRawFieldState: (): Record<string, any> => fieldState.value,

        setRawFieldState: (newState: Record<string, any>): void => {
          fieldState.value = { ...fieldState.value, ...newState }
          saveFieldStateToStorage()
        },

        forceUpdate: (): void => {
          forceUpdateTrigger.value++
        },

        getInternalState: (): Record<string, any> => {
          return {
            tableHeight: tableHeight.value,
            pendingTableHeight: pendingTableHeight.value,
            currentPage: currentPage.value,
            tableData: tableData.value,
            totalCount: totalCount.value,
            currentStatus: currentStatus.value,
            isProcessing: isProcessing.value,
            processingOperation: processingOperation.value,
            cachedFullData: cachedFullData.value,
            markingsStorage: Object.fromEntries(markingsStorage.value),
            fieldState: fieldState.value,
            currentTableId: currentTableId.value
          }
        },

        setInternalState: (state: Record<string, any>): void => {
          if (state.tableHeight !== undefined) tableHeight.value = state.tableHeight
          if (state.pendingTableHeight !== undefined) pendingTableHeight.value = state.pendingTableHeight
          if (state.currentPage !== undefined) currentPage.value = state.currentPage
          if (state.tableData !== undefined) tableData.value = state.tableData
          if (state.totalCount !== undefined) totalCount.value = state.totalCount
          if (state.currentStatus !== undefined) currentStatus.value = state.currentStatus
          if (state.isProcessing !== undefined) isProcessing.value = state.isProcessing
          if (state.processingOperation !== undefined) processingOperation.value = state.processingOperation
          if (state.cachedFullData !== undefined) cachedFullData.value = state.cachedFullData
          if (state.markingsStorage !== undefined) {
            markingsStorage.value = new Map(Object.entries(state.markingsStorage))
          }
          if (state.fieldState !== undefined) fieldState.value = state.fieldState

          forceUpdateTrigger.value++
          checkTableStatus()
        },

        executeCustomFunction: (fn: (context: Record<string, any>) => any): any => {
          try {
            return fn({
              displayData: displayData.value,
              config: config.value,
              fieldState: fieldState.value,
              markingsStorage: markingsStorage.value,
              tableHeight: tableHeight.value,
              currentPage: currentPage.value,
              totalCount: totalCount.value,
              currentStatus: currentStatus.value,
              displayFields: displayFields.value
            })
          } catch (error) {
            console.error('执行自定义函数失败:', error)
            return null
          }
        },

        debug: {
          logState: (): void => {
            console.group('Table Debug Info')
            console.log('Config:', config.value)
            console.log('Field State:', fieldState.value)
            console.log('Table Status:', {
              height: tableHeight.value,
              page: currentPage.value,
              total: totalCount.value,
              status: currentStatus.value
            })
            console.log('Markings:', Object.fromEntries(markingsStorage.value))
            console.log('Display Fields:', displayFields.value)
            console.log('Display Data:', displayData.value)
            console.groupEnd()
          },

          testDataLoad: async (): Promise<any[] | null> => {
            try {
              const data = await getFullTableData()
              console.log('Test Data Load Success:', data.length, 'records')
              return data
            } catch (error) {
              console.error('Test Data Load Failed:', error)
              return null
            }
          },

          simulateError: (errorType: string = 'generic'): void => {
            const errorMap: Record<string, string> = {
              'generic': 'error',
              'loading': 'loading',
              'empty': 'empty',
              'noheader': 'noheader',
              'pagelimit': 'pagelimit',
              'narrow': 'narrow'
            }

            currentStatus.value = errorMap[errorType] || 'error'
          },

          resetToNormal: (): void => {
            currentStatus.value = ''
            isProcessing.value = false
            processingOperation.value = ''
            checkTableStatus()
          }
        }
      }
    }
  })()
})
</script>

<style scoped>
.md-std-table-container {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
  min-height: auto;
}

.md-std-table {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  overflow: visible;
  width: 100%;
  min-width: 480px;
  position: relative;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
}

.md-button-hover-unified:hover {
  background: rgba(0, 0, 0, 0.04) !important;
}

.md-table thead tr {
  background: transparent;
  border-bottom: 2px solid #7e7e7e;
}

.md-table thead th {
  background: transparent;
  color: #202124;
  font-weight: 400;
  font-size: 14px;
  padding: 16px 12px;
  text-align: left;
  border-bottom: none;
  position: relative;
}

.md-table thead th:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  bottom: 25%;
  width: 1px;
  background: rgba(66, 133, 244, 0.2);
}

.md-table-header {
  padding: 24px 32px;
  border-bottom: 1px solid #e8eaed;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  position: relative;
}

.md-table-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: start;
}

.md-table-function-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  justify-self: center;
}

.md-table-height-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  justify-self: end;
}

.md-table-title {
  font-size: 20px;
  color: #202124;
  margin: 0;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.md-info-button, .md-guide-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-info-icon, .md-guide-icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.md-info-button:hover .md-info-icon,
.md-guide-button:hover .md-guide-icon {
  opacity: 1;
}

.md-function-group {
  position: relative;
}

.md-function-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15);
}

.md-function-trigger.active {
  background: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.15);
  transform: scale(0.95);
}

.md-function-trigger.disabled {
  opacity: 0.38;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08);
}

.md-function-trigger.disabled:hover {
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08);
}

.disabled-text {
  color: #a3a3a3;
  opacity: 0.6;
}

.disabled-group {
  opacity: 0.6;
}

.disabled-container {
  opacity: 0.6;
}

.disabled-icon {
  opacity: 0.38;
}

.md-function-icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.md-function-trigger:hover:not(.disabled) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  background: #fff;
}

.md-function-trigger:hover:not(.disabled) .md-function-icon {
  opacity: 1;
}

.md-function-popup {
  position: fixed;
  background: #ffffff;
  border-radius: 12px;
  padding: 8px 0;
  min-width: 220px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
  z-index: 1100 !important;
  border: 1px solid #e8eaed;
  transform-origin: top center;
}

.md-export-popup {
  max-height: 300px;
}

.md-export-scroll {
  max-height: 192px;
  overflow-y: auto;
  padding: 0;
}

.md-export-scroll::-webkit-scrollbar {
  width: 6px;
}

.md-export-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.md-export-scroll::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.md-export-scroll::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.md-function-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.md-function-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.md-function-item-icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
}

.md-function-item-text {
  font-size: 14px;
  color: #202124;
  font-weight: 400;
}

.md-height-control-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  padding: 8px 0;
  border-radius: 0;
  border: none;
  position: relative;
}

.md-height-text {
  font-size: 14px;
  color: #5f6368;
  white-space: nowrap;
}

.md-height-input-new {
  width: 60px;
  padding: 8px 12px;
  border: 2px solid #dadce0;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  background: #ffffff;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.md-height-input-new:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.md-height-adjust-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15);
}

.md-height-adjust-trigger:hover:not(.disabled) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.md-height-adjust-trigger:hover:not(.disabled) .md-adjust-icon-large {
  opacity: 1;
}

.md-height-adjust-trigger.active {
  background: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.15);
  transform: scale(0.95);
}

.md-height-adjust-trigger.disabled {
  opacity: 0.38;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08);
}

.md-height-adjust-trigger.disabled:hover {
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08);
}

.md-adjust-icon-large {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.md-height-slider-popup-new {
  position: fixed;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
  z-index: 1100 !important;
  border: 1px solid #e8eaed;
  transform-origin: top right;
}

.md-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.md-slider-title {
  font-size: 16px;
  font-weight: 500;
  color: #202124;
}

.md-slider-content {
  position: relative;
}

.md-slider-wrapper {
  position: relative;
  height: 48px;
  margin: 0 16px;
}

.md-slider-wrapper::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: repeating-linear-gradient(
      to right,
      #dadce0 0,
      #dadce0 2px,
      transparent 2px,
      transparent 25%
  );
  transform: translateY(-50%);
  pointer-events: none;
}

.md-material-slider {
  position: absolute;
  width: 100%;
  height: 48px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.md-slider-track-bg {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #dadce0;
  border-radius: 2px;
  transform: translateY(-50%);
}

.md-slider-track-active {
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%);
  border-radius: 2px;
  transform: translateY(-50%);
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-slider-thumb {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(30, 64, 175, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.md-suggest-value {
  font-size: 16px;
  font-weight: 500;
  color: #2196f3;
  background: rgba(33, 150, 243, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
}

.md-table-content {
  background: #ffffff;
  width: 100%;
  position: relative;
}

.md-table-field-header {
  display: flex;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%);
  border-bottom: 1px solid #5f6368;
  width: 100%;
}

.md-field-cell {
  padding: 16px 2px;
  font-weight: 500;
  color: #202124;
  text-align: center;
  border-right: 2px solid #dadce0;
  font-size: 14px;
  letter-spacing: 0.2px;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 40px;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.md-field-cell:last-child {
  border-right: none;
}

.md-table-data {
  position: relative;
  overflow: visible;
}

.md-data-row {
  display: flex;
  border-bottom: 1px solid #f1f3f4;
  min-height: 48px;
  align-items: center;
  transition: background-color 0.2s ease;
  cursor: pointer;
  width: 100%;
}

.md-data-row:hover:not(.marking-disabled) {
  background: rgba(95, 99, 104, 0.08);
}

.md-data-row.marking-disabled {
  cursor: default;
}

.md-data-row.highlighted {
  background: #fff3cd !important;
}

.md-data-row.strikethrough {
  background: #f8d7da !important;
  text-decoration: line-through;
}

.md-data-row.strikethrough .md-data-cell {
  text-decoration: line-through;
}

.md-data-cell {
  padding: 12px 6px;
  color: #3c4043;
  border-right: 1px solid #f1f3f4;
  font-size: 14px;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
}

.md-data-cell:last-child {
  border-right: none;
}

.md-empty-row {
  justify-content: center;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px dashed #dadce0;
}

.md-empty-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  opacity: 0.5;
}

.md-empty-icon {
  width: 20px;
  height: 20px;
}

.md-empty-text {
  font-size: 12px;
  color: #5f6368;
  font-style: italic;
  font-weight: 300;
}

.md-table-controls-footer {
  padding: 20px 32px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-top: 1px solid #e8eaed;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.md-table-info {
  font-size: 14px;
  color: #5f6368;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: start;
}

.md-status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.md-status-text {
  font-weight: 500;
  margin-right: 8px;
}

.md-data-info {
  font-weight: 400;
}

.md-page-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: end;
}

.md-page-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid #dadce0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-page-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.md-page-button:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.md-page-icon {
  width: 20px;
  height: 20px;
}

.md-goto-input-container {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.md-goto-input-container .md-goto-input {
  min-width: 60px;
  padding: 8px 28px 8px 12px;
  border: 2px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-style: italic;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #000000;
  font-weight: 600;
  background: #ffffff;
}

.md-goto-input-container .md-goto-input:focus {
  outline: none;
  border-color: #f4f4f4;
  box-shadow: 0 0 0 3px rgba(241, 241, 241, 0.1);
  font-style: normal;
}

.md-goto-input-container .md-goto-input-wide {
  min-width: 180px;
  max-width: 240px;
}

.md-goto-input-container .md-goto-input.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.md-goto-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #2E7D32 0%, rgba(46, 125, 50, 0.95) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.md-goto-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #1B5E20 0%, rgba(27, 94, 32, 0.91) 100%);
  transform: translateZ(3px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.md-goto-button:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.md-goto-button:disabled:hover {
  background: linear-gradient(135deg, #2E7D32 0%, rgba(46, 125, 50, 0.95) 100%);
  transform: none;
  box-shadow: none;
}

.md-goto-button:disabled .md-goto-icon {
  opacity: 0.38;
}

.md-goto-text {
  font-weight: 500;
}

.md-goto-icon {
  width: 16px;
  height: 16px;
}

.md-page-control-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-page-control-info:hover {
  transform: scale(1.05);
}

.md-control-info-icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.md-page-control-info:hover .md-control-info-icon {
  opacity: 1;
}

.md-status-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.md-data-only-overlay {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
}

.md-status-content {
  text-align: center;
  max-width: 400px;
  padding: 32px;
}

.md-status-icon {
  margin-bottom: 20px;
}

.md-status-icon.breathing .md-status-image {
  animation: breathing 2s ease-in-out infinite;
}

.md-status-image {
  width: 72px;
  height: 72px;
  opacity: 0.8;
}

.md-status-main {
  font-size: 22px;
  color: #202124;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.md-status-sub {
  font-size: 18px;
  color: #5f6368;
  line-height: 1.6;
}

.md-tooltip {
  background: rgba(32, 33, 36, 0.9) !important;
  color: white !important;
  padding: 16px 20px !important;
  border-radius: 8px !important;
  font-size: 12px !important;
  max-width: 380px !important;
  min-width: 240px !important;
  line-height: 1.6 !important;
  z-index: 1000 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  word-wrap: break-word !important;
  white-space: normal !important;
}

.md-tooltip-content {
  white-space: pre-line !important;
  word-wrap: break-word !important;
}

.md-disabled-tooltip {
  max-width: 320px !important;
  min-width: 220px !important;
}

.md-table td {
  word-wrap: break-word;
  word-break: break-all;
  max-width: 0;
}

.md-table thead th,
.md-table tbody td {
  padding: 12px 16px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.md-table tbody td {
  white-space: normal;
  word-wrap: break-word;
}

.md-table thead th {
  white-space: nowrap;
  position: relative;
}

.function-popup-enter-active, .function-popup-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.function-popup-enter-from, .function-popup-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

.function-popup-enter-to, .function-popup-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.slider-popup-enter-active, .slider-popup-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slider-popup-enter-from, .slider-popup-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

.slider-popup-enter-to, .slider-popup-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@keyframes breathing {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes breathing-light {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.md-slider-labels-dynamic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 8px;
  font-size: 12px;
  color: #5f6368;
}

.md-step-label {
  font-size: 12px;
  text-align: center;
  min-width: 24px;
  padding: 2px 4px;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-step-normal {
  color: #5f6368;
  background: transparent;
}

.md-step-current {
  font-size: 14px;
  font-weight: 600;
  color: #2196f3;
  background: rgba(33, 150, 243, 0.15);
  padding: 4px 8px;
  border-radius: 10px;
  border: 1px solid rgba(33, 150, 243, 0.3);
  transform: scale(1.1);
}

.md-step-suggested {
  font-size: 14px;
  font-weight: 600;
  color: #ff9800;
  background: rgba(255, 152, 0, 0.15);
  padding: 4px 8px;
  border-radius: 10px;
  border: 1px dashed rgba(255, 152, 0, 0.4);
  transform: scale(1.1);
}

.md-suggest-value {
  font-size: 16px;
  font-weight: 500;
  color: #2196f3;
  background: rgba(33, 150, 243, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  min-width: 40px;
  text-align: center;
}

.md-step-current::before {
  content: '●';
  margin-right: 2px;
  font-size: 8px;
}

.md-step-suggested::before {
  content: '◐';
  margin-right: 2px;
  font-size: 8px;
}

.breathing-green {
  background: #34a853;
  animation: breathing-light 2s ease-in-out infinite;
}

.green {
  background: #34a853;
}

.red {
  background: #ea4335;
}

.orange {
  background: #fbbc04;
}

.md-footer-center-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
}

.md-footer-center-controls .md-guide-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-footer-center-controls .md-guide-icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.md-footer-center-controls .md-guide-button:hover .md-guide-icon {
  opacity: 1;
}

.md-goto-input-container {
  position: relative;
  display: inline-block;
}

.md-goto-spinner {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  background: transparent;
  border: none;
  padding: 0;
  gap: 0;
}

.md-spinner-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0;
  margin: 0;
  border-radius: 2px;
}

.md-spinner-button:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.1);
}

.md-spinner-button:active:not(:disabled) {
  background: rgba(0, 0, 0, 0.15);
  transform: scale(0.95);
}

.md-spinner-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.md-spinner-icon {
  width: 12px;
  height: 12px;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}

.md-spinner-button:hover:not(:disabled) .md-spinner-icon {
  opacity: 0.9;
}

.md-spinner-button:disabled .md-spinner-icon {
  opacity: 0.2;
}

.md-goto-spinner.disabled .md-spinner-button {
  cursor: not-allowed;
  opacity: 0.3;
}

.md-field-cell {
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.md-field-cell:hover:not(.md-field-disabled) {
  background: rgba(0, 0, 0, 0.08);
}

.md-field-cell.md-field-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.md-field-cell.md-field-pinned {
  font-weight: 700;
  background: rgba(97, 97, 97, 0.12);
}

.md-field-cell.md-field-sorted {
  font-style: italic;
}

.md-field-cell.md-field-pinned.md-field-sorted {
  background: rgba(97, 97, 97, 0.02);
}

.md-field-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
}

.md-field-icon-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 24px;
  height: 100%;
  flex-shrink: 0;
}

.md-field-title {
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;
}

.md-field-icon-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 24px;
  height: 100%;
  flex-shrink: 0;
}

.md-field-icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.md-pin-icon {
  filter: hue-rotate(200deg) saturate(1.2);
}

.md-sort-icon {
  filter: hue-rotate(30deg) saturate(1.1);
}

.md-field-cell:hover .md-field-icon {
  opacity: 1;
}

.md-data-row .md-data-cell:first-child {
  font-weight: 500;
}

.md-data-row .md-data-cell.md-data-cell-pinned {
  font-weight: 700;
  background: rgba(97, 97, 97, 0.06);
}

.md-field-cell.md-field-long-pressing {
  background: rgba(97, 97, 97, 0.2);
  transform: scale(0.98);
  transition: all 0.1s ease;
}

.md-field-cell.md-field-long-pressing::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
  transparent 25%,
  rgba(97, 97, 97, 0.1) 25%,
  rgba(97, 97, 97, 0.1) 50%,
  transparent 50%,
  transparent 75%,
  rgba(97, 97, 97, 0.1) 75%);
  background-size: 8px 8px;
  animation: move-stripes 0.5s linear infinite;
  pointer-events: none;
}

@keyframes move-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 8px 8px; }
}
</style>