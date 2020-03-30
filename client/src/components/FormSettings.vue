<template>
    <div>
        <form class="form" @submit="changePassword()">
            <div class="form__field">
                <label for="change_password" class="form__label"
                    >Change Password</label
                >
                <input
                    type="password"
                    id="change_password"
                    class="form__input"
                    placeholder="**********"
                    v-model="password"
                    required
                />
            </div>
            <button class="button" type="submit">Change Password</button>
        </form>

        <form class="form" @submit="uploadImage()">
            <div class="form__group">
                <div class="form__field">
                    <label for="file" class="form__label"
                        >Choose new profile image</label
                    >
                    <input
                        type="file"
                        id="file"
                        accept=".jpg, .jpeg"
                        required
                        @change="onFileChange($event.target.files)"
                    />
                    <span
                        ><strong>{{ errorText }}</strong></span
                    >
                </div>
                <div v-if="image !== null" class="form__field">
                    <img
                        class="form__image-preview"
                        :src="image"
                        alt="Ваше изображение"
                    />
                </div>
            </div>
            <button class="button" type="submit">Upload Image</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "FormSettings",
    data() {
        return {
            password: "",
            image: null,
            errorDialog: false,
            errorText: "",
            imageFile: null,
            maxSize: 5120
        };
    },
    methods: {
        onFileChange(file) {
            const { maxSize } = this;
            let imageFile = file[0];

            // check if user actually selected a file
            if (file.length > 0) {
                let size = imageFile.size / maxSize / 1024;

                if (size > 1) {
                    // check whether the size is greater than the size limit
                    this.errorDialog = true;
                    this.errorText =
                        "Your file is too big! Please select an image under 5MB";
                } else {
                    // turn file into image URL
                    let imageURL = URL.createObjectURL(imageFile);
                    this.errorText = "";
                    this.imageFile = imageFile;
                    this.image = imageURL;
                }
            }
        }
    }
};
</script>

<style></style>
