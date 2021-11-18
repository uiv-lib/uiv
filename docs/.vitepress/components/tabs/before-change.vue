<template>
  <section class="uiv">
    <tabs v-model="index" :before-change="onBeforeChange">
      <tab title="Home">
        <div>
          <br />
          <form class="form-inline">
            <div class="form-group">
              <label for="exampleInputName">Name</label>
              <input
                id="exampleInputName"
                v-model="input"
                type="text"
                class="form-control"
                placeholder="Please fill this section"
              />
            </div>
          </form>
        </div>
      </tab>
      <tab title="Profile">
        <p>Profile tab.</p>
      </tab>
      <tab title="Others">
        <p>Others tab.</p>
      </tab>
    </tabs>
  </section>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      input: '',
    };
  },
  methods: {
    onBeforeChange(indexFrom, indexTo, done) {
      if (indexFrom === 0 && this.input === '') {
        this.$notify('Please fill your name first.');
        done(1);
      } else {
        done();
      }
    },
  },
};
</script>
