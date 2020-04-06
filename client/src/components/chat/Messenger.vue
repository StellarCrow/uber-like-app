<template>
    <div class="messenger">
        <div class="messenger__header">Messenger</div>
        <div class="messenger__body">
            <div v-for="(text, index) in this.history" :key="index">
                {{ text }}
            </div>
        </div>
        <div class="messenger__footer">
            <form class="form messenger__form" @submit.prevent="sendMessage">
                <input
                    class="form__input"
                    type="text"
                    v-model="message"
                    placeholder="Write a message..."
                />
                <button type="submit" class="button form__button">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
import { serverUrl } from "../../utils/constants.js";
import { mapState } from "vuex";

export default {
    name: "Messenger",
    props: ["room"],
    data() {
        return {
            socket: io(serverUrl),
            message: "",
            history: []
        };
    },
    computed: {
        ...mapState({
            user: state => state.Auth.user.role_id
        })
    },
    mounted() {
        this.socket.on("connect", () => {
            console.log("connected");
            const params = {
                room: this.room,
                userId: this.user
            };
            this.socket.emit("join", params);
        });
        this.socket.on("newMessage", data => {
            this.history.push(data);
        });
    },
    methods: {
        sendMessage() {
            this.socket.emit("message", { message: this.message });
            this.message = "";
        }
    }
};
</script>

<style></style>
