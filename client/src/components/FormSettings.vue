<template>
    <div>
        <form class="form" @submit.prevent="changePassword()">
            <div class="form__header">Change Password</div>
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
                <div class="form__error" v-if="error">
                    {{ error }}
                </div>
                <div class="form__message" v-if="message">
                    {{ message }}
                </div>
            </div>
            <button class="button" type="submit">Change Password</button>
        </form>

        <form
            class="form"
            enctype="multipart/form-data"
            @submit.prevent="uploadImage()"
        >
            <div class="form__header">Change avatar</div>
            <div class="form__group form__group--uploadImage">
                <div class="form__field">
                    <label for="file" class="form__label"
                        >Choose new profile image</label
                    >
                    <input
                        type="file"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        name="image"
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
            <div class="form__message" v-if="messageAvatar">
                {{ messageAvatar }}
            </div>
        </form>
        <form class="form" @submit="deleteAccount()" v-if="isShipper">
            <div class="form__header">Delete account</div>
            <button
                @click="deleteAccount()"
                class="button button--delete"
                type="submit"
            >
                Delete account
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "FormSettings",
    data() {
        return {
            password: "",
            image: null,
            errorDialog: false,
            errorText: "",
            imageFile: null,
            maxSize: 5120,
            message: "",
            messageAvatar: "",
            error: ""
        };
    },
    computed: {
        ...mapState({
            id: state => state.Auth.user._id,
            role: state => state.Auth.role,
            roleId: state => state.Auth.user.role_id
        }),
        isShipper() {
            return this.role === "shipper";
        }
    },
    methods: {
        ...mapActions([
            "updatePassword",
            "deleteShipperAccount",
            "updateAvatar"
        ]),
        async changePassword() {
            try {
                const payload = {
                    id: this.id,
                    password: this.password
                };
                const res = await this.updatePassword(payload);

                if (res.message) {
                    this.message = res.message;
                } else {
                    this.error = res.error.response.data.error;
                }
            } catch (err) {
                this.error = err.message;
            }
        },
        async deleteAccount() {
            try {
                const res = await this.deleteShipperAccount(this.roleId);
                if (res.user) {
                    this.$router.push("/");
                } else {
                    this.error = res.error.response.data.error;
                }
            } catch (err) {
                this.error = err.message;
            }
        },
        onFileChange(file) {
            const { maxSize } = this;
            const imageFile = file[0];

            // check if user actually selected a file
            if (file.length > 0) {
                const size = imageFile.size / maxSize / 1024;

                if (size > 1) {
                    // check whether the size is greater than the size limit
                    this.errorDialog = true;
                    this.errorText =
                        "Your file is too big! Please select an image under 5MB";
                } else {
                    // turn file into image URL
                    const imageURL = URL.createObjectURL(imageFile);
                    this.errorText = "";
                    this.imageFile = imageFile;
                    this.image = imageURL;
                }
            }
        },
        async uploadImage() {
            if (this.imageFile) {
                const data = new FormData();
                data.append("image", this.imageFile);
                const payload = {
                    imageFile: data,
                    userId: this.id
                };
                try {
                    const res = await this.updateAvatar(payload);
                    if (res.image) {
                        this.messageAvatar = "Avatar updated";
                    } else {
                        this.messageAvatar = res.error.response.data.error;
                    }
                } catch (err) {
                    this.messageAvatar = err.message;
                }
            }
        }
    }
};
</script>

<style></style>
