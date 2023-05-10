<script setup lang="ts">
import type { DriverProperties } from '@/@fake-db/types';
import { useUserListStore } from '@/views/apps/user/useUserListStore';
// import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { avatarText } from '@core/utils/formatters';

import { users } from '@/@fake-db/apps/user-list';
import styled from 'vue3-styled-components';

const StyledVChip = styled.div`
  .v-chip__underlay {
    border-radius: 40px
  }
`;

// 👉 Store
const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const drivers = ref<DriverProperties[]>([])

// 👉 Fetching users

const fetchUsers = () => {
  drivers.value = users
  // userListStore.fetchUsers({
  //   q: searchQuery.value,
  //   status: selectedStatus.value,
  //   plan: selectedPlan.value,
  //   role: selectedRole.value,
  //   perPage: rowPerPage.value,
  //   currentPage: currentPage.value,
  // }).then(response => {
  //   users.value = response.data.users
  //   totalPage.value = response.data.totalPage
  //   totalUsers.value = response.data.totalUsers
  // }).catch(error => {
  //   console.error(error)
  // })
}

watchEffect(fetchUsers)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 search filters
const roles = [
  { title: 'Admin', value: 'admin' },
  { title: 'Author', value: 'author' },
  { title: 'Editor', value: 'editor' },
  { title: 'Maintainer', value: 'maintainer' },
  { title: 'Subscriber', value: 'subscriber' },
]

const plans = [
  { title: 'Basic', value: 'basic' },
  { title: 'Company', value: 'company' },
  { title: 'Enterprise', value: 'enterprise' },
  { title: 'Team', value: 'team' },
]

const status = [
  { title: 'Pending', value: 'pending' },
  { title: 'Active', value: 'active' },
  { title: 'Inactive', value: 'inactive' },
]

const resolveAvatarColorVariant = () => {
  const random = Math.floor(Math.random() * 5);

  switch(random) {
    case 0:
      return 'warning'
    case 1:
      return 'success'
    case 2:
      return 'primary'
    case 3:
      return 'info'
    case 4:
      return 'secondary'
    default: 
      return 'primary'
  }
}

const resolveUserRoleVariant = (role: string) => {
  if (role === 'subscriber')
    return { color: 'warning', icon: 'tabler-user' }
  if (role === 'author')
    return { color: 'success', icon: 'tabler-circle-check' }
  if (role === 'maintainer')
    return { color: 'primary', icon: 'tabler-chart-pie-2' }
  if (role === 'editor')
    return { color: 'info', icon: 'tabler-pencil' }
  if (role === 'admin')
    return { color: 'secondary', icon: 'tabler-device-laptop' }

  return { color: 'primary', icon: 'tabler-user' }
}

const resolveDriverStatusVariant = (stat: string) => {
  if (stat === 'Driving')
    return 'success'
  if (stat === 'Available')
    return 'success'
  if (stat === 'Unavailable')
    return 'warning'

  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = drivers.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = drivers.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalUsers.value} entries`
})

// 👉 Add new user
// const addNewUser = (userData: UserProperties) => {
//   userListStore.addUser(userData)

//   // refetch User
//   fetchUsers()
// }

// 👉 List
const userListMeta = [
  {
    icon: 'tabler-user-check',
    color: 'success',
    title: 'Active drivers',
    stats: '21',
  },
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'All drivers',
    stats: '37',
  },
  {
    icon: 'tabler-stars',
    color: 'error',
    title: 'Average driver score',
    stats: '4.67',
  },
  {
    icon: 'tabler-urgent',
    color: 'warning',
    title: 'Alerts',
    stats: '3',
  },
]
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for="meta in userListMeta"
        :key="meta.title"
        cols="12"
        sm="6"
        lg="3"
      >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <h2>{{ meta.stats }}</h2>
              <span>{{ meta.title }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard title="Drivers">
          <!-- <VCardText>
            <VRow>
              <VCol
                cols="12"
                sm="4"
              >
                <VSelect
                  v-model="selectedRole"
                  label="Select Role"
                  :items="roles"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <VCol
                cols="12"
                sm="4"
              >
                <VSelect
                  v-model="selectedPlan"
                  label="Select Plan"
                  :items="plans"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <VCol
                cols="12"
                sm="4"
              >
                <VSelect
                  v-model="selectedStatus"
                  label="Select Status"
                  :items="status"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText> -->

          <!-- <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 80px;"
            >
              <VSelect
                v-model="rowPerPage"
                density="compact"
                variant="outlined"
                :items="[10, 20, 30, 50]"
              />
            </div>

            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <div style="width: 10rem;">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>

              <VBtn
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-screen-share"
              >
                Export
              </VBtn>

              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Add New User
              </VBtn>
            </div>
          </VCardText>

          <VDivider /> -->

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col" style="width: 38px;">
                  
                </th>
                <th scope="col">
                  Name
                </th>
                <th scope="col">
                  Status
                </th>
                <th scope="col">
                  Region
                </th>
                <th scope="col">
                  Rating
                </th>
                <th scope="col">
                  Alerts
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="user in drivers"
                :key="user.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 User -->
                <td>
                  <VAvatar
                    variant="tonal"
                    :color="resolveAvatarColorVariant()"
                    size="38"
                  >
                    <VImg
                      v-if="user.avatar"
                      :src="user.avatar"
                    />
                    <span v-else>{{ avatarText(user.fullName) }}</span>
                  </VAvatar>
                </td>
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <!-- <RouterLink
                          :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                          class="font-weight-medium user-list-name"
                        > -->
                          {{ user.fullName }}
                        <!-- </RouterLink> -->
                      </h6>
                    </div>
                  </div>
                </td>

                <!-- 👉 Role -->
                <td>
                  <StyledVChip>
                    <VChip
                      label
                      :color="resolveDriverStatusVariant(user.status)"
                      size="small"
                      class="text-capitalize"
                    >
                      <VIcon
                        start
                        size="20"
                        icon="tabler-point"
                      />
                      {{ user.status }}
                    </VChip>
                  </StyledVChip>
                </td>

                <!-- 👉 Plan -->
                <td>
                  <span class="text-capitalize text-base font-weight-semibold">{{ user.region }}</span>
                </td>

                <td>
                  {{ user.rating }}
                </td>

                <!-- 👉 Status -->
                <td>
                  {{ user.alerts }}
                </td>

                <!-- 👉 Actions -->
                <!-- <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                    />
                  </VBtn>

                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                    />
                  </VBtn>

                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-dots-vertical"
                    />

                    <VMenu activator="parent">
                      <VList>
                        <VListItem
                          title="View"
                          :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                        />
                        <VListItem
                          title="Suspend"
                          href="javascript:void(0)"
                        />
                      </VList>
                    </VMenu>
                  </VBtn>
                </td> -->
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!drivers.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  No data available
                </td>
              </tr>
            </tfoot>
          </VTable>
<!-- 
          <VDivider />

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText> -->
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <!-- <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    /> -->
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
