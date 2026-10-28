from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel

app = FastAPI()

sugerencias = []

class sugerencia(BaseModel):
    nombre: str
    correo: str
    queja: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "Mensaje":"Hola"
    }

@app.get("/ImagenesSlider")
def imagenes_slider():
    respuesta = [

        { 
            "src": "https://static1.squarespace.com/static/521e95f4e4b01c5870ce81cf/t/55e6681fe4b05f924df365d8/1441163330952/?format=1500w",
            "alt": "Monitoreo agua",
            "nombre": "Monitoreo de agua" 
        },
        { 
            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhz9M9tnfyZA9IiOMMwEsaYKJIHc1tl6VazjCwg0O08UHQ3GIwcSbP9k&s=10",
            "alt": "Fugas",
            "nombre": "Detección de fugas" 
        },
        { 
            "src": "https://telemetrik.co/wp-content/uploads/2023/04/Sensores-de-nivel-e-IoT-la-clave-para-la-optimizacio%CC%81n-del-servicio-en-el-acueducto-de-Segovia-970x457.jpg",
            "alt": "Tanques",
            "nombre": "Monitoreo de tanques" 
        },
        { 
            "src": "https://i.pinimg.com/736x/37/f9/9e/37f99e422f151a5914f50d70673e9e3c.jpg",
            "alt": "Dashboard",
            "nombre": "Panel de control" 
        }
        
    ]
    return {"respuesta": respuesta}


@app.get("/ImagenesGaleria")
def imagenes_galeria():
    respuesta = [
        
        { 
            "src": "https://www.tecpi.com.co/wp-content/uploads/2024/10/planta-aguas-tunja-veolia-tecpi-jpg.webp",
            "alt": "Estacion monitoreo",
            "nombre": "Estacion de monitoreo" 
        },
        {   
            "src": "https://medicionycontrol.com.co/wp-content/uploads/2022/11/Medidor-de-Flujo-tipos-y-caracteristicas-Medicion-y-Control.jpg",
            "alt": "Sensor caudal",
            "nombre": "Sensor de caudal"  
        },
        { 
            "src": "https://telemetrik.co/wp-content/uploads/2023/02/Monitoreo-del-nivel-del-agua-en-tiempo-real-con-tecnologi%CC%81a-IoT-Tablero-720x478.jpg",
            "alt": "Panel IoT", 
            "nombre": "Panel de control IoT" 
        },
        { 
            "src": "https://www.vanguardia.com/resizer/v2/oygukygfiu858257420230803172821jpg-WI7HRQMV7JHURPWWZOGHLYAQII.jpg?auth=533a63ad7d18f18038651678c61e1f2dc663e6f4b08791099d70d543d9e7f105&smart=true&width=1200&height=800&quality=70",
            "alt": "Tanque inteligente",
            "nombre": "Tanque inteligente" 
        },
        { 
            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhz9M9tnfyZA9IiOMMwEsaYKJIHc1tl6VazjCwg0O08UHQ3GIwcSbP9k&s=10",
            "alt": "Supervision tecnica",
            "nombre": "Supervision tecnica" 
        }
    ]
    return {"respuesta": respuesta}


@app.get("/ImagenesIOT")
def imagenes_iot():
    respuesta = [
        {
          "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhyVaxGAP1M9qb9x19hEZcKHEwWHueBmHV4i0Cud6Jvh8JaYAx_YSeZU&s=10",
          "alt": "Presion agua",
          "titulo": "Monitoreo de Presion",
          "descripcion": "Medicion en tiempo real mediante sensores de presion. Detecta variaciones anormales y posibles fugas.",
          "badge": "Prioridad ALTA"
        },
        {
          "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4fOKGXQOOsAirdZ4v6Ei26Gi2SgR1C8OgHf8WtEQ-HNxQt1BqXqBaUWs&s=10",
          "alt": "Nivel tanques",
          "titulo": "Nivel de Tanques",
          "descripcion": "Sensores de nivel ultrasonicos que actualizan automaticamente el volumen de almacenamiento.",
          "badge": "Control de abastecimiento"
        },
        {
          "img": "https://www.esders.es/wp-content/uploads/2023/10/Wasserleck-Tracergas-TIB40-H2-Markus-1494x1040-1.jpg",
          "alt": "Fugas",
          "titulo": "Deteccion de Fugas",
          "descripcion": "Algoritmos que comparan flujo y presion; alertan ante fugas en la red de distribucion.",
          "badge": "Ahorro hidrico"
        },
        {
          "img": "https://fotografias.lasexta.com/clipping/cmsimages02/2021/07/08/62A2683F-7D56-4DAC-A3F7-F87735DD973C/98.jpg?crop=1300,731,x0,y9&width=1900&height=1069&optimize=high&format=webply",
          "alt": "Alertas",
          "titulo": "Generacion de Alertas",
          "descripcion": "Notificaciones automaticas al personal tecnico via app y panel central.",
          "badge": "Respuesta rapida"
        }
    ]

    return {
        "respuesta" : respuesta
    }

@app.post("/guardarSugerencia")
def guardar_sugerencia(datos: sugerencia):
    nueva = {
        "id": len(sugerencias) + 1,
        "nombre": datos.nombre,
        "correo": datos.correo,
        "queja": datos.queja,
        "fecha": datetime.now().strftime("%Y-%m-%d %H:%M")
    }
    sugerencias.append(nueva)
    return {
        "Mensaje": "Sugerencia enviada con exito",
        "Sugerencia": nueva
    }

@app.get("/obtenerSugerencias")
def obtener_sugerencias():
    return {"respuesta": sugerencias}
