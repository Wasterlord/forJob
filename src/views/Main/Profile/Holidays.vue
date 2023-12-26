<template>
  <div class="vacation">
    <div class="vacation_basic">
      <div class="basic-container">
        <div class="header">Основной отпуск:</div>
        <div class="tip">
          <Popper placement="top" hover arrow>
            <img src="/assets/images/info.svg" alt="info" />
            <template #content>
              <div class="tip-styles">Информация обновляется 1 раз в месяц</div>
            </template>
          </Popper>
        </div>
        <div class="days">{{ basicVacation }} дней</div>
        <div class="text">
          Ежегодный основной оплачиваемый отпуск продолжительностью 28
          календарных дней предоставляется всем сотрудникам компании. В
          соответствии с трудовым кодексом, ежегодно одна из частей отпуска
          должна составлять не менее 14 календарный дней.
        </div>
      </div>
    </div>
    <div class="vacation_additional" v-if="Number(additionalVacation) > 0">
      <div class="additional-container">
        <div class="header">Дополнительный отпуск:</div>
        <div class="tip">
          <Popper placement="top" hover arrow>
            <img src="/assets/images/info.svg" alt="info" />
            <template #content>
              <div class="tip-styles">Информация обновляется 1 раз в месяц</div>
            </template>
          </Popper>
        </div>
        <div class="days">{{ additionalVacation }} дней</div>
        <div class="text">
          Дополнительный отпуск предоставляется лицам, работающим в районах
          Крайнего Севера и приравненных к ним местностях. Указанный отпуск по
          письменному заявлению работника можно заменить денежной компенсацией
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import Popper from "vue3-popper";
export default {
  name: "Holidays",
  components: {
    Popper,
  },
  props: ["basicVacation", "additionalVacation"],
  setup(props) {
    const basicVacation = computed(() => {
      return props.basicVacation;
    });
    const additionalVacation = computed(() => {
      return props.additionalVacation;
    });
    return {
      basicVacation,
      additionalVacation,
    };
  },
};
</script>
