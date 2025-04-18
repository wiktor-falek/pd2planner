import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import CreateBuild from "./pages/CreateBuild.vue";
import Build from "./pages/Build.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", name: "home", component: Home },
		{ path: "/build/", name: "create-build", component: CreateBuild, props: true },
		{ path: "/build/:buildId", name: "build", component: Build, props: true },
	],
});

export default router;
