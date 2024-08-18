import { createPinia } from 'pinia';
import { dynamicCrudStore } from 'quasar-crud-kaushal/src/stores/dynamicCrudStore';  // Adjust the path if needed

export default ({ app }) => {
    const pinia = createPinia();
    app.use(pinia);

    // Register your dynamic store
    pinia.use(() => {
        dynamicCrudStore();
    });
};
