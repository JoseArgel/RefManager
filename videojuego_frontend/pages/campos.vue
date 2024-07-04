<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col>
                <material-card color="green" title="CREAR CAMPO">
                    <v-row>
                        <v-col cols="5">
                            <v-form ref="form">
                                <v-text-field
                                    v-model="paquete.nombre"
                                    label="Nombre"
                                    required
                                    :rules="[(v) => !!v || 'Campo es requerido']"
                                ></v-text-field>
                            </v-form>
                        </v-col>
                        <v-col>
                            <v-select
                                v-model="paquete.tipo"
                                :items="opciones"
                                item-text="tipo"
                                item-title="tipo"
                                :rules="[(v) => !!v || 'El tipo es requerido']"
                                item-value="_id"
                                label="Tipo"
                                required
                            ></v-select>
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
            <v-col cols="12" sm="6" md="4" v-for="(item, index) in campos" :key="index">
                <v-card class="my-2 custom-card" elevation="2" outlined>
                    <v-row align="center" justify="space-between">
                        <v-col cols="8">
                            <v-card-title>{{ item.nombre }}</v-card-title>
                            <v-card-title>{{ item.tipo }}</v-card-title>
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
                <v-card-title class="text-center">Actualizar Campo</v-card-title>
                <v-card-text>
                    <v-text-field v-model="cuerpo.nombre" label="Nombre del campo"></v-text-field>
                    <v-select
                        v-model="cuerpo.tipo"
                        :items="opciones"
                        item-text="tipo"
                        item-title="tipo"
                        label="Tipo del campo"
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="updateCampo">Actualizar</v-btn>
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
            cuerpo: {
                nombre: null,
                tipo: null,
            },
            index: null,
            headers: [
                { title: 'CAMPOS', align: 'start', value: 'campo' },
                { title: 'TIPOS', align: 'end', value: 'tipo' },
            ],
            opciones: ['text', 'number'],
            paquete: {
                nombre: null,
                tipo: null,
            },
            campos: [],
            snackbar: {
                show: false,
                message: '',
                color: '',
                timeout: 1500,
            },
        };
    },

    mounted() {
        this.cargadatos();
    },

    methods: {
        async guardar() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                this.carga = true;
                try {
                    await axios.post('http://localhost:4000/fields', this.paquete);
                    this.cargadatos();
                    this.snackbar.message = 'Campo creado exitosamente';
                    this.snackbar.color = 'success';
                    this.snackbar.show = true;
                    this.$refs.form.reset();
                    this.carga = false;
                } catch (error) {
                    console.error('Error al guardar campo:', error);
                    this.snackbar.message = 'Error al crear el campo';
                    this.snackbar.color = 'error';
                    this.snackbar.show = true;
                    this.$refs.form.reset();
                    this.carga = false;
                }
            }
        },

        preeditar(index) {
            this.showEditDialog = true;
            this.cuerpo = { ...this.campos[index] }; // Copiar objeto para evitar mutaciones directas
            this.index = index;
        },

        async updateCampo() {
            const idCampo = this.campos[this.index]._id;
            try {
                await axios.patch(`http://localhost:4000/fields/${idCampo}`, {
                    nombre: this.cuerpo.nombre,
                    tipo: this.cuerpo.tipo,
                });
                this.campos[this.index].nombre = this.cuerpo.nombre;
                this.campos[this.index].tipo = this.cuerpo.tipo;
                this.showEditDialog = false;
                this.snackbar.message = 'Campo actualizado exitosamente';
                this.snackbar.color = 'success';
                this.snackbar.show = true;
            } catch (error) {
                console.error('Error al actualizar campo:', error);
                this.snackbar.message = 'Error al actualizar el campo';
                this.snackbar.color = 'error';
                this.snackbar.show = true;
            }
        },

        cancelar() {
            this.$refs.form.reset();
            this.showEditDialog = false;
        },

        async cargadatos() {
            try {
                const response = await axios.get('http://localhost:4000/fields');
                this.campos = response.data;
            } catch (error) {
                console.error('Error al obtener campos:', error);
            }
        },

        async eliminar(index) {
            const id = this.campos[index]._id;
            try {
                await axios.delete(`http://localhost:4000/fields/${id}`);
                this.cargadatos();
                this.snackbar.message = 'Campo eliminado exitosamente';
                this.snackbar.color = 'success';
                this.snackbar.show = true;
            } catch (error) {
                console.error('Error al eliminar campo:', error);
                this.snackbar.message = 'Error al eliminar el campo';
                this.snackbar.color = 'error';
                this.snackbar.show = true;
            }
        },
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
