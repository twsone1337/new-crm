<!-- <template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="+ Добавить заказ"
        class="ma-5"
        color="primary"
      >
        + Добавить заказ
      </v-btn>
    </template>
    <template #default>
      <v-card width="500">
        <v-toolbar title="Добавление заказа"></v-toolbar>
        <v-card-text>
          <v-select
            label="Товар"
            :items="products"
            item-title="name"
            item-value="id"
            v-model="form.packageId"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="dialog = false"></v-btn>
          <v-btn
            text="Добавить"
            color="primary"
            variant="flat"
            @click="createOrder"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useLoginStore } from '../../stores/store';
import axios from 'axios';

const loginStore = useLoginStore();
const form = reactive({
  name: '',
  item: '',
  quantity: 0,
});
const products = ref([]);
const dialog = ref(false);

const loadProducts = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get<any>(
      'http://5.189.237.172:3000/products',
      config
    );

    products.value = data;
  } catch (error) {}
};

onMounted(() => {
  loadProducts();
});
</script> -->
