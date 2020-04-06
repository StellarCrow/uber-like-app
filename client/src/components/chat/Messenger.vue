<template>
    <div class="messenger">
        <div class="messenger__header">Messenger</div>
        <div class="messenger__body">
            <div v-for="(text, index) in this.history" :key="index">
                {{ text }}
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
                <button type="submit" class="button messenger__button">Send</button>
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
        this.connectToRoom();
    },
    methods: {
        sendMessage() {
            this.socket.emit("message", { message: this.message });
            this.message = "";
        },
        connectToRoom() {
            this.history = [];
            this.socket.on("connect", () => {
                console.log("connected");
                const params = {
                    room: this.room,
                    userId: this.userId,
                    name: this.username
                };
                this.socket.emit("join", params);
            });
            this.socket.on("newMessage", data => {
                this.history.push(data);
            });
        }
    },
    // watch: {
    //     room: {
    //         immediate: true,
    //         handler() {
    //             console.log("In watcher");
                
    //             this.connectToRoom();
    //         }
    //     }
    // }
};
</script>

<style lang="scss" scoped>
@import '../../styles/components/_messenger.scss';
</style>
