import React, {useContext, useState} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { useHistory } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

export default function NuevoPlatillo() {

//states para las imagenes
const [subiendo, setSubiendo] = useState(false)
const [progreso, setProgreso] = useState(0)
const [urlImagen, setUrlImagen] = useState('')

//funcion para moverse a otra pantalla
let history = useHistory();

//Context con operaciones de firebase
const {firebase} = useContext(FirebaseContext)


const formik = useFormik({
    initialValues:{
        nombre:'',
        precio:'',
        categoria:'',
        descripcion:"",
    },
    validationSchema: Yup.object(
        {
            nombre: Yup.string()
                .min(3, 'Los platillos deben tener al menos 3 caracteres')
                .required('El Nombre del platillo es obligatorio'),
            precio: Yup.number()
                .min(1, 'Debes agregar un número')
                .required('El Precio del platillo es obligatorio'),
            categoria: Yup.string()
                .required('El Categoría del platillo es obligatoria'),
            descripcion: Yup.string()
                .min(10, 'La descripción debe ser más larga')
                .required('El Descripción del platillo es obligatorio')
        }
    ),
    onSubmit: platillo => {
      platillo.existencia = true;
      platillo.imagen = urlImagen;
        console.log(platillo);
        try {
          firebase.db.collection('productos').add(platillo)
          history.push("/menu");
        } catch (error) {
          
        }
    }
})
//Funciones para manejar las funciones
const handleUploadStart = () => {
  setProgreso(0)
  setSubiendo(true)

}
const handleUploadError = (error) => {
  setSubiendo(false)
  console.log(error)
}
const handleUploadSuccess = async (nombre) => {
  setProgreso(100)
  setSubiendo(false)
  //almacenar la url de destino
  const url = await firebase.storage.ref("productos")
  .child(nombre)
  .getDownloadURL();
  console.log(url)
  setUrlImagen(url)

}

const handleProgress = (progreso) => {
  setProgreso(progreso)
  console.log(progreso)
}



  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Nuevo Platillo</h1>
      <div className="text-3xl justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Platillo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.nombre && formik.errors.nombre ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ): null
            }
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="precio"
              >
                  Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.precio && formik.errors.precio ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ): null
            }
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="categoria"
              >
                Categoría
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                  <option value="">--Seleccione--</option>
                  <option value="desayuno">--Desayuno--</option>
                  <option value="almuerzo">--Almuerzo--</option>
                  <option value="cena">--Cena--</option>
                  <option value="bebidas">--Bebidas--</option>
                  <option value="postres">--Postres--</option>
                  <option value="ensaladas">--Ensaladas--</option>

              </select>

            </div>
            {
              formik.touched.categoria && formik.errors.categoria ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.categoria}</p>
                </div>
              ): null
            }
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="imagen"
              >
                  Imagen
              </label>
              <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress ={handleProgress}

              />
              {subiendo && (
                <div className="h-12 relative w-full border">
                  <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progreso}%`}}>
                    {progreso} %
                    </div>
                </div>
              )
              }
              {
                urlImagen && (
                  <p className="bg-green-500 text-white p-3 text-center my-5">
                    La imagen se subió correctamente
                  </p>
                )
              }
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="descripcion"
              >
                Descripción
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="descripcion"
                placeholder="Descripción del platillo"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
            </textarea>
            </div>
            {
              formik.touched.descripcion && formik.errors.descripcion ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.descripcion}</p>
                </div>
              ): null
            }
            <input 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
