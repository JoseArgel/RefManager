<template>
    <v-sheet class="mx-auto" width="600" padding="40">
        <v-form ref="form">
            <v-select
                v-model="fuente"
                :items="fuentes"
                item-text="nombre"
                item-title="nombre"
                :rules="[(v) => !!v || 'La fuente es requerida']"
                item-value="_id"
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

            <v-container fill-height fluid grid-list-xl class="sub">
                <v-row>
                    <v-col class="mr-4" cols="4">
                        <h3 class="titulo">CAMPOS</h3>
                        <draggable class="list-group fondo" :list="campos" group="people" @change="log">
                            <div v-for="item in campos" :key="item.id" class="d-flex justify-center container">
                                <v-chip class="mb-2 item">
                                    {{ item.nombre }}
                                </v-chip>
                            </div>
                        </draggable>
                    </v-col>

                    <v-col class="mr-4" cols="4">
                        <h3 class="titulo">SELECCIONADOS</h3>
                        <draggable class="list-group fondo2" :list="list2" group="people" @change="log">
                            <div v-for="item in list2" :key="item.id" class="d-flex justify-center container">
                                <v-chip class="mb-2 item">
                                    {{ item.nombre }}
                                </v-chip>
                            </div>
                        </draggable>
                    </v-col>
                </v-row>
            </v-container>
            <div class="d-flex flex-column botones">
                <v-btn class="mt-4" color="success" block @click="validate">Guardar</v-btn>

                <v-btn class="mt-4" color="error" block @click="reset">Reset</v-btn>
            </div>
        </v-form>
    </v-sheet>
    <pre>{{ $data }}</pre>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
        {{ snackbar.message }}
        <v-btn color="white" text @click="snackbar.show = false">Cerrar</v-btn>
    </v-snackbar>
</template>

<script>
import axios from 'axios';
import { VueDraggableNext } from 'vue-draggable-next';

export default {
    components: {
        draggable: VueDraggableNext,
    },
    data() {
        return {
            api: `${process.env.HOST}:${process.env.PORT}`,
            fuentes: [],
            estilos: [],
            campos: [],
            originalCampos: [],
            list2: [],
            fuente: null,
            estilo: null,
            extractedIds: [],
            snackbar: {
                show: false,
                message: '',
                color: '',
                timeout: 1500,
            },
        };
    },
    async mounted() {
        try {
            const [fuentesResponse, estilosResponse, fieldsResponse] = await Promise.all([
                axios.get('http://localhost:4000/sources'),
                axios.get('http://localhost:4000/styles'),
                axios.get('http://localhost:4000/fields'),
            ]);

            this.fuentes = fuentesResponse.data;
            this.estilos = estilosResponse.data;
            this.campos = fieldsResponse.data;
            this.originalCampos = [...fieldsResponse.data];
        } catch (error) {
            console.error('Error loading data:', error);
        }
    },
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate();

            if (valid) {
                const ids = this.extractIds();
                const data = {
                    source: this.fuente,
                    style: this.estilo,
                    field: ids,
                };
                console.log('Datos a enviar:', data);
                await this.sendDataToServer(data);

                this.snackbar.message = 'Se ha creado una plantilla de referencia';
                this.snackbar.color = 'success';
                this.snackbar.show = true;
                this.$refs.form.reset();
                this.campos = [...this.originalCampos];
                this.list2 = [];
            }
        },
        reset() {
            this.$refs.form.reset();
            this.campos = [...this.originalCampos];
            this.list2 = [];
        },
        extractIds() {
            const idSet = new Set();

            this.list2.forEach((item) => {
                idSet.add(item._id);
            });

            this.extractedIds = Array.from(idSet);
            return this.extractedIds;
        },
        async sendDataToServer(data) {
            try {
                const response = await axios.post('http://localhost:4000/references', data);
                console.log('Respuesta del servidor:', response.data);
            } catch (error) {
                console.error('Error al enviar datos:', error);
            }
        },
    },
};
</script>

<style scoped>
.sub {
    display: flex;
    width: 100%;
}

.fondo {
    background: #f0f0f0;
    border: 2px dashed #ccc;
    padding: 10px;
    border-radius: 10px;
    transition: background 0.3s;
}
.fondo:hover {
    background: #e0e0e0;
}

.fondo2 {
    background: #ffe0e0;
    border: 2px dashed #f5a3a3;
    padding: 10px;
    border-radius: 10px;
    transition: background 0.3s;
}
.fondo2:hover {
    background: #ffd0d0;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.item {
    width: 100%;
    padding: 10px;
    color: #fff;
    background: #007bff;
    text-align: center;
    cursor: move;
    border-radius: 5px;
    transition: background 0.3s, transform 0.3s;
}
.item:hover {
    background: #0056b3;
    transform: scale(1.05);
}

.titulo {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.botones .v-btn {
    margin-top: 10px;
    transition: background 0.3s, transform 0.3s;
}
.botones .v-btn:hover {
    transform: scale(1.02);
}
</style>
