<template>
    <ul class="contact-list">
        <li
            class="contact"
            v-for="load in this.assignedLoads"
            :key="load._id"
            @click="selectDialog(load._id)"
        >
            <div class="contact__name">
                {{ load.assigned_to.user.name }}
            </div>
            <div class="contact__email">{{ load.assigned_to.user.email }}</div>
            <div class="contact__load">
                {{ load.name }}
            </div>
        </li>
    </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "ContactList",
    data() {
        return {};
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
        selectDialog(loadId) {
            this.$emit("selectedDialog", loadId);
        }
    }
};
</script>

<style></style>
