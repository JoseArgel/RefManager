<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col>
                <material-card color="green" title="CREAR ESTILO">
                    <v-row>
                        <v-col cols="5">
                            <v-form ref="form">
                                <v-text-field
                                    v-model="paquete.nombre"
                                    label="Nombre"
                                    required
                                    :rules="[(v) => !!v || 'Estilo es requerido']"
                                ></v-text-field>
                            </v-form>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <v-btn v-if="!editar" color="success" @click="guardar">Guardar</v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="orange" @click="cancelar">Cancelar</v-btn>
                        </v-col>
                    </v-row>
                </material-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(item, index) in estilos" :key="index">
                <v-card class="my-2 custom-card" elevation="2" outlined>
                    <v-row align="center" justify="space-between">
                        <v-col cols="8">
                            <v-card-title>{{ item.nombre }}</v-card-title>
                        </v-col>
                        <v-col cols="4" class="text-right">
                            <v-btn class="ma-1 ml-10" color="yellow" icon @click="preeditar(index)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="ma-1" color="red" icon @click="eliminar(index)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-overlay :value="carga" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>

        <v-dialog v-model="showEditDialog" max-width="400">
            <v-card>
                <v-card-title class="text-center">Actualizar Estilo</v-card-title>
                <v-card-text>
                    <v-text-field v-model="cuerpo" label="Nombre del estilo"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="updateEstilo">Actualizar</v-btn>
                    <v-btn color="red darken-1" text @click="showEditDialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
            {{ snackbar.message }}
            <v-btn color="white" text @click="snackbar.show = false">Cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            carga: false,
            api: `${process.env.HOST}:${process.env.PORT}`,
            showEditDialog: false,
            cuerpo: null,
            index: null,
            editar: false,

            paquete: {
                nombre: null,
            },
            estilos: [],
            snackbar: {
                show: false,
                message: '',
                color: '',
                timeout: 1500,
            },
        };
    },
    methods: {
        async guardar() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                this.carga = true;
                try {
                    await axios.post('http://localhost:4000/styles', this.paquete);
                    this.cargadatos();
                    this.snackbar.message = 'Estilo creado exitosamente';
                    this.snackbar.color = 'success';
                    this.snackbar.show = true;
                    this.$refs.form.reset();
                    this.carga = false;
                } catch (error) {
                    console.error('Error al guardar estilo:', error);
                    this.snackbar.message = 'Error al crear el estilo';
                    this.snackbar.color = 'error';
                    this.snackbar.show = true;
                    this.$refs.form.reset();
                    this.carga = false;
                }
            }
        },

        preeditar(index) {
            this.showEditDialog = true;
            this.cuerpo = this.estilos[index].nombre;
            this.index = index;
        },

        async updateEstilo() {
            const idEstilo = this.estilos[this.index]._id;
            try {
                await axios.patch(`http://localhost:4000/styles/${idEstilo}`, {
                    nombre: this.cuerpo,
                });
                this.estilos[this.index].nombre = this.cuerpo;
                this.showEditDialog = false;
                this.snackbar.message = 'Estilo actualizado exitosamente';
                this.snackbar.color = 'success';
                this.snackbar.show = true;
            } catch (error) {
                console.error('Error al actualizar estilo:', error);
                this.snackbar.message = 'Error al actualizar el estilo';
                this.snackbar.color = 'error';
                this.snackbar.show = true;
            }
        },

        cancelar() {
            this.$refs.form.reset();
            this.editar = false;
        },

        async cargadatos() {
            try {
                const response = await axios.get('http://localhost:4000/styles');
                this.estilos = response.data;
            } catch (error) {
                console.error('Error al obtener estilos:', error);
            }
        },

        async eliminar(index) {
            const id = this.estilos[index]._id;
            try {
                await axios.delete(`http://localhost:4000/styles/${id}`);
                this.cargadatos();
                this.snackbar.message = 'Estilo eliminado exitosamente';
                this.snackbar.color = 'success';
                this.snackbar.show = true;
            } catch (error) {
                console.error('Error al eliminar estilo:', error);
                this.snackbar.message = 'Error al eliminar el estilo';
                this.snackbar.color = 'error';
                this.snackbar.show = true;
            }
        },
    },

    mounted() {
        this.cargadatos();
    },
};
</script>

<style>
.custom-card {
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.custom-card:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}
</style>
