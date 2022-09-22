//TODO: seeds script should come here, so we'll be able to put some data in our local env

// 100 users, 100 products, and 100 comments

const axios = require("axios");

const NUMBER_SEED_DATA = 10;

const TEN_SECONDS = 10 * 1000;

const client = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 3000}`,
  timeout: TEN_SECONDS,
});

const createItem = async (client, itemTitle) => {
  const item = {
    item: {
      title: itemTitle,
      description: "Seed description",
      tag_list: ["tag1"],
    },
  };
  const itemRes = await client.post(`/api/items`, item);
  return itemRes.data?.item;
};

const createUser = async (client, number) => {
  const user = {
    user: {
      username: "SeedUser" + number,
      email: "engine" + number + "@wilco.work",
      password: "wilco1234",
    },
  };

  try {
    const loginRes = await client.post(`/api/users/login`, user);
    if (loginRes.data?.user?.token) {
      return loginRes.data.user.token;
    }
  } catch (e) {
    //User doesn't exists yet
    const err = e;
  }

  const userRes = await client.post(`/api/users`, user);
  return userRes.data?.user?.token;
};

const createComment = async (client, item, body) => {
  try {
    const comment = {
      comment: {
        body: body,
      },
    };

    const commentRes = await client.post(
      `/api/items/` + item.slug + `/comments`,
      comment,
      item
    );

    return commentRes.data?.comment;
  } catch (e) {
    // fehler
  }
};

const main = async () => {
  let item = "";

  for (let i = 1; i <= NUMBER_SEED_DATA; i++) {
    // users

    const token = await createUser(client, i);

    client.defaults.headers.common["Authorization"] = `Token ${token}`;
  }

  for (let i = 1; i <= NUMBER_SEED_DATA; i++) {
    // items

    item = await createItem(client, "SeedItem" + i);
  }

  for (let i = 1; i <= NUMBER_SEED_DATA; i++) {
    const comment = await createComment(client, item, "Test Comment " + i);
  }

  console.log("... done");
};

main();
