<template>
    <v-sheet class="mx-auto" width="600" padding="40">
        <v-form ref="form">
            <v-select
                v-model="fuente"
                :items="fuentes"
                item-text="nombre"
                item-title="nombre"
                item-value="_id"
                :rules="[(v) => !!v || 'La fuente es requerida']"
                label="Fuente"
                required
            ></v-select>

            <v-select
                v-model="estilo"
                :items="estilos"
                item-text="nombre"
                item-title="nombre"
                :rules="[(v) => !!v || 'El estilo es requerido']"
                item-value="_id"
                label="Estilo"
                required
            ></v-select>

            <v-text-field
                v-for="(data, index) in paquete.field"
                :key="data._id"
                v-model="valores[index]"
                :type="data.tipo"
                :placeholder="data.nombre"
            ></v-text-field>

            <div class="d-flex flex-column botones">
                <v-btn class="mt-4" color="blue" block @click="validar">Validar</v-btn>
                <v-btn class="mt-4" color="success" block @click="guardar">Guardar</v-btn>
                <v-btn class="mt-4" color="error" block @click="reset">Reset</v-btn>
            </div>
        </v-form>

        <v-row>
            <v-col cols="12">
                <v-card class="my-5" elevation="2">
                    <v-card-title class="headline font-weight-bold">Referencias</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-list class="list">
                            <v-list-item-group v-if="cargados">
                                <v-list-item v-for="(item, index) in paquete" :key="index">
                                    <v-list-item-content>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="6" sm="4">
                                                    <v-list-item-title class="text">
                                                        {{ item.nombre }}
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle
                                                        class="text"
                                                        v-for="(field, i) in item.field"
                                                        :key="i"
                                                    >
                                                        {{ field.nombre }}
                                                        {{ field.valor }}{{ obtenerSeparador(field.tipo) }}
                                                    </v-list-item-subtitle>
                                                </v-col>
                                                <v-col cols="6" sm="2" class="text-right">
                                                    <v-btn class="ma-1" color="yellow" icon @click="preeditar(index)">
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn class="ma-1" color="red" icon @click="eliminar(index)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            <v-overlay v-else :value="carga" class="align-center justify-center">
                                <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
                            </v-overlay>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-sheet>

    <pre>{{ $data }}</pre>

    <v-dialog v-model="showEditDialog" max-width="400">
        <v-card>
            <v-card-title class="text-center">Actualizar Referencia</v-card-title>
            <v-card-text>
                <v-form ref="editForm">
                    <v-text-field
                        v-for="(field, i) in currentItem.field"
                        :key="field._id"
                        v-model="currentItem.field[i].valor"
                        :label="field.nombre"
                        :type="field.tipo"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="updateRef">Actualizar</v-btn>
                <v-btn color="red darken-1" text @click="showEditDialog = false">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
        {{ snackbar.message }}
        <v-btn color="white" text @click="snackbar.show = false">Cerrar</v-btn>
    </v-snackbar>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            carga: false,
            api: `${process.env.HOST}:${process.env.PORT}`,
            showEditDialog: false,
            currentItem: null,
            headers: [{ title: 'REFERENCIAS', align: 'start', value: 'ref' }],
            paquete: [],
            fuentes: [],
            estilos: [],
            valores: [],
            referencia: null,
            fuente: null,
            estilo: null,
            cargados: false,
            snackbar: {
                show: false,
                message: '',
                color: '',
                timeout: 3000,
            },
        };
    },

    async mounted() {
        this.cargados = false;
        try {
            const [referenciasResponse, fuentesResponse, estilosResponse] = await Promise.all([
                axios.get('http://localhost:4000/references'),
                axios.get('http://localhost:4000/sources'),
                axios.get('http://localhost:4000/styles'),
            ]);

            this.paquete = referenciasResponse.data;
            this.fuentes = fuentesResponse.data;
            this.estilos = estilosResponse.data;
            this.cargados = true;
        } catch (error) {
            this.cargados = false;
            console.error('Error loading data:', error);
        }
        this.cargadatos();
    },

    methods: {
        async guardar() {
            // Itera sobre los campos en paquete.field y asigna los valores desde valores[] a paquete.field[]
            for (let i = 0; i <= this.paquete.field.length - 1; i++) {
                this.paquete.field[i].valor = this.valores[i];
            }

            // Elimina el campo _id del paquete, si existe, para evitar el error de clave duplicada
            const paqueteSinId = { ...this.paquete };
            delete paqueteSinId._id;

            try {
                // Realiza una solicitud POST al endpoint 'http://localhost:4000/refs' con paqueteSinId como datos del cuerpo
                const response = await axios.post('http://localhost:4000/refs', paqueteSinId);
                console.log(response.data);
                this.cargadatos();
                this.showSnackbar('Referencia guardada con éxito', 'success');
                this.fuente = null;
                this.estilo = null;
            } catch (error) {
                console.error('Error posting data:', error);
                this.showSnackbar('Error al guardar la referencia', 'error');
            }
        },

        obtenerSeparador(tipo) {
            switch (tipo) {
                case 'text':
                    return ', ';
                default:
                    return '. ';
            }
        },

        async validar() {
            try {
                const response = await axios.get(
                    `http://localhost:4000/references/fuente/${this.fuente}/estilo/${this.estilo}`
                );
                console.log(response);

                if (response.data.length > 0) {
                    this.paquete = response.data[0];
                    this.showSnackbar('Existe una plantilla para esta referencia', 'success');
                } else {
                    this.paquete = [];
                    this.showSnackbar('No existe una plantilla para esta referencia', 'error');
                    this.cargadatos();
                }
            } catch (error) {
                console.error('Error al validar:', error);
                this.showSnackbar('Error al validar la referencia', 'error');
                this.cargadatos();
            }
        },

        preeditar(index) {
            // Copia profunda del objeto seleccionado para edición
            this.currentItem = JSON.parse(JSON.stringify(this.paquete[index]));
            this.showEditDialog = true;
        },

        async updateRef() {
            const idRef = this.currentItem._id;
            try {
                const response = await axios.patch(`http://localhost:4000/refs/${idRef}`, {
                    field: this.currentItem.field,
                });
                console.log('Response: ' + response);

                // Actualiza la referencia en la lista local después de la edición
                const index = this.paquete.findIndex((item) => item._id === idRef);
                this.paquete.splice(index, 1, this.currentItem);
                this.showEditDialog = false;
                this.showSnackbar('Referencia actualizada con éxito', 'success');
            } catch (error) {
                console.error('Error updating data:', error);
                this.showSnackbar('Error al actualizar la referencia', 'error');
            }
        },

        async cargadatos() {
            await axios.get('http://localhost:4000/refs').then((response) => {
                this.paquete = response.data;
                console.log(this.paquete);
            });
        },

        async eliminar(index) {
            const id = this.paquete[index]._id;
            try {
                await axios.delete(`http://localhost:4000/refs/${id}`);
                this.cargadatos();
                this.showSnackbar('Referencia eliminada con éxito', 'success');
            } catch (error) {
                console.error('Error deleting ref:', error);
                this.showSnackbar('Error al eliminar la referencia', 'error');
            }
        },

        reset() {
            this.fuente = null;
            this.estilo = null;
            this.valores = this.paquete.field.map(() => '');
            this.cargadatos();
        },

        showSnackbar(message, color) {
            this.snackbar.message = message;
            this.snackbar.color = color;
            this.snackbar.show = true;
        },
    },
};
</script>

<style>
.field-item {
    margin-bottom: 4px;
}

.list {
    width: 1100px;
    padding: 15px;
    border-radius: 8px;
}

.text {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5rem;
}
</style>
