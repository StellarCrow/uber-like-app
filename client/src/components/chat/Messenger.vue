<template>
    <div class="messenger">
        <div class="messenger__header">Messenger</div>
        <div class="messenger__body">
            <div v-for="(message, index) in this.history" :key="index">
                {{ message.text }}
            </div>
        </div>
        <div class="messenger__footer">
            <form class="messenger__form" @submit.prevent="sendMessage">
                <input
                    class="messenger__input"
                    type="text"
                    v-model="message"
                    placeholder="Write a message..."
                />
                <button type="submit" class="button messenger__button">
                    Send
                </button>
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
            userId: state => state.Auth.user.role_id,
            username: state => state.Auth.user.name
        })
    },
    mounted() {

    },
    methods: {
        sendMessage() {
            this.socket.emit("message", { message: this.message });
            this.message = "";
        },
        connectToRoom() {
            const params = {
                room: this.room,
                userId: this.userId,
                name: this.username
            };
            this.socket.on("connect", () => {
                console.log("connected");

                this.socket.emit("join", params);

                this.socket.on("newMessage", data => {
                    const message = {
                        text: data.message,
                        user: data.userId,
                    }
                    this.history.push(message);
                });
            });
        },
        joinRoom() {
            this.history = []
            const params = {
                room: this.room,
                userId: this.userId,
                name: this.username
            };
            this.socket.emit("join", params);
        }
    },
    watch: {
        room: {
            immediate: true,
            handler(newValue, oldValue) {
                console.log("In watcher");
                if((newValue && oldValue) && (newValue !== oldValue)) {
                    this.joinRoom();
                }
                
                if (newValue !== oldValue) {
                    this.connectToRoom();
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/_messenger.scss";
</style>
