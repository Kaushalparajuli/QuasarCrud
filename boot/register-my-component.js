import CustomTable from '../src/templates/CustomTable.vue'

// we globally register our component with Vue
export default ({ app }) => {
    app.component('custom-table', CustomTable)
}
