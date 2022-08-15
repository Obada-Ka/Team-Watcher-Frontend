<template>
  <base-dialog :show="isLoading" title="Processing..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
  <base-dialog
    :show="error.length > 0"
    title="An error occurred"
    @close="handleError"
    ><p>
      {{ error }}
    </p>
  </base-dialog>
  <users-item title="Users" v-if="users.length">
    <template #th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <!-- <th>Actions</th> -->
    </template>
    <template v-for="(user, index) in users" :key="user.id">
      <tr>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <div class="roles-container">
            <div class="role" v-for="role in roles" :key="role.id">
              <input
                type="checkbox"
                :id="index + `-` + role.id"
                :checked="checkRole(user.roles, role)"
                @change="changeUserRole($event, user.id, role.id)"
              />
              <label :for="index + `-` + role.id">
                {{ role.name }}
              </label>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </users-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import usersItem from "../../components/users/usersItem.vue";
export default defineComponent({
  components: {
    usersItem,
  },
  data() {
    return {
      isLoading: false,
      error: "",
      users: [],
      roles: [
        {
          name: "admin",
          id: 1,
        },
        {
          name: "user",
          id: 2,
        },
      ],
    };
  },
  computed: {
    checkRole() {
      return (userRoles: any, standardRole: any) => {
        const checkRole = userRoles.find((role: any) => {
          return role.id === standardRole.id;
        });
        return checkRole;
      };
    },
  },
  methods: {
    async getAllUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("user/getAllUsers");
        this.users = this.$store.getters["user/users"];
        this.isLoading = false;
      } catch (err: any) {
        this.isLoading = false;
        this.error = err.error.data.message || "Failed to process, try later.";
      }
    },
    async changeUserRole($event: any, user_id: any, role_id: any) {
      this.isLoading = true;
      try {
        if ($event.target.checked) {
          await this.$store.dispatch("user/assignUserRole", {
            userId: user_id,
            newRoleId: role_id,
          });
        } else {
          await this.$store.dispatch("user/removeUserRole", {
            userId: user_id,
            roleId: role_id,
          });
        }
        this.isLoading = false;
      } catch (err: any) {
        this.isLoading = false;
        this.error = err.error.data.data || "Failed to process, try later.";
      }
    },
    handleError() {
      this.error = "";
    },
  },
  mounted() {
    this.getAllUsers();
  },
});
</script>
<style scoped>
.roles-container {
  display: flex;
  justify-content: space-evenly;
}

.role input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
}
.role label {
  position: relative;
  cursor: pointer;
}

.role label:before {
  content: "";
  -webkit-appearance: none;
  background-color: transparent;
  border: 2px solid #0079bf;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 10px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}

.role input:checked + label:after {
  content: "";
  display: block;
  position: absolute;
  top: 2px;
  left: 9px;
  width: 6px;
  height: 14px;
  border: solid #0079bf;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
