export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnmks3gw0/upload';

    //Nuestra api debe llevar los campos de upload_preset y file, por ello los agregamos (eso lo hacemos por el FormData)
    const formData = new FormData();

    //Cremosuna key y le asignamos su valor
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        // Como las peticiones por defecto son GET, hay que cambiarlo por el POST
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        //Si todo va bien y nuestra imagen se subió al servidor, regresamos el URL de la imagen 
        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {

            //En caso de que algo falle, mostramos un error
            throw await resp.json();
        };
    } catch (error) {
        throw error;
    }

    //return url_image
};