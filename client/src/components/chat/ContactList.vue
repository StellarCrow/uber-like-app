<template>
    <ul class="contact-list">
        <li
            class="contact-list__item contact"
            v-for="load in this.assignedLoads"
            :key="load._id"
            @click="selectDialog(load._id, load.assigned_to.user.name)"
        >
            <div class="contact__avatar">
                <img
                    :src="avatarSrc(load.assigned_to.user.avatar)"
                    class="contact__image"
                    alt=""
                />
            </div>
            <div class="contact__details">
                <div class="contact__name">
                    {{ load.assigned_to.user.name }}
                </div>
                <div class="contact__email">
                    {{ load.assigned_to.user.email }}
                </div>
            </div>

            <div class="contact__load">
                {{ load.name }}
            </div>
        </li>
    </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defaultAvatar } from "../../utils/constants";

export default {
    name: "ContactList",
    data() {
        return {
            publicPath: process.env.BASE_URL
        };
    },
    computed: {
        ...mapState({
            assignedLoads: state => state.Shipper.assignedLoadsList,
            roleId: state => state.Auth.user.role_id
        })
    },
    async mounted() {
        try {
            await this.getAssignedLoads(this.roleId);
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        ...mapActions(["getAssignedLoads"]),
        selectDialog(loadId, name) {
            this.$emit("selectedDialog", { loadId, name });
        },
        avatarSrc(src) {
            if (src) {
                return src;
            } else {
                return `${this.publicPath}${defaultAvatar}`;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/_contact-list.scss";
</style>
