<template>
    <div class="contacts">
        {{ this.assignedLoads }}
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "ContactList",
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
        ...mapActions(["getAssignedLoads"])
    }
};
</script>

<style></style>
