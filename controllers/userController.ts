interface User {
  email: String;
  fullname: String;
  address: String;
}

let DataUser: Array<User> = [
  {
    email: "casmidi@gmail.com",
    fullname: "Casmidi",
    address: "Indonesia",
  },
  {
    email: "warsito@gmail.com",
    fullname: "Warsito",
    address: "Indonesia",
  },
];

class userController {
  /**
   * Get Users
   *
   * @param {Response}
   * @param {Response}
   */
  static getUser = async ({ response }: { response: any }): Promise<void> => {
    response.body = DataUser;
  };

  /**
   * Add User
   *
   * @param {Request }
   */
  static addUser = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }): Promise<void> => {
    try {
      const body = await request.body();
      console.log(body.value);
      const users: User = body.value;
      DataUser.push(users);

      response.body = { message: "User has been added" };
      response.status = 200;
    } catch (error) {
      response.body = { message: error };
    }
  };

  /**
   * Details User
   *
   *  @param {Request}
   *  @param {Params}
   */
  static detailUser = async ({
    params,
    response,
  }: {
    params: any;
    response: any;
  }): Promise<void> => {
    const users: User | undefined = DataUser.filter(
      (data) => data.fullname === params.fullname,
    )[0];

    response.body = users;
  };

  /**
   * Update data user
   *
   * @param {Request}
   * @Response {Response}
   */
  static updateUser = async ({
    params,
    request,
    response,
  }: {
    params: any;
    request: any;
    response: any;
  }): Promise<void> => {
    let users: User =
      DataUser.filter((data) => data.fullname === params.fullname)[0];

    if (users) {
      const body = await request.body();
      const updateUser: {
        email?: String;
        fullname?: String;
        address?: String;
      } = body.value;
      users = { ...users, ...updateUser };
      DataUser = [
        ...DataUser.filter((data) => data.fullname === params.fullname),
        users,
      ];

      response.body = { message: "User has been updated" };
    }
  };

  static deleteUser = async ({
    params,
    response,
  }: {
    params: any;
    response: any;
  }): Promise<void> => {
    DataUser = DataUser.filter((data) => data.fullname !== params.fullname);

    response.body = { message: "User has been deleted" };
  };
}

export default userController;
