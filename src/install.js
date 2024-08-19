module.exports = function (api) {
    api.extendQuasarConf((conf) => {
        // Assuming dynamicCrudStore.js is inside your extension's src/boot directory
        conf.boot.push('~quasar-crud-kaushal/src/boot/dynamicCrudStore.js');
        conf.boot.push('~quasar-crud-kaushal/src/boot/axios.js');


        // Make sure to add Pinia if not already included
        conf.build.transpileDependencies.push(/quasar-crud-kaushal[\\/]src/);

        // If Pinia is not installed, you can include it as a dependency
        if (!conf.framework.plugins.includes('Pinia')) {
            conf.framework.plugins.push('Pinia');
        }

    });
};
