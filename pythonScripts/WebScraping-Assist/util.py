from os import path, sep

"""

"""


def construct_path(file_name: str, dir_levels_up: int = 0) -> str:
    """
    Join current directory path with a desired file name,
    returning full path as a string.

    Full path will be found regardless of os being used.

    Parameters
    ---
    file_name: str
        The desired file name, including subdirectories if desired.
    dir_levels_up: int
        The desired number of directory levels to go up
        from the current directory level.
        Defaulted to 0.

    Returns
    ---
    str
        The full directory path including the given file name.
    """
    dir_path_list = path.dirname(path.abspath(__file__)).split(sep)
    # print(dir_path_list)
    desired_dir = sep.join(dir_path_list[:len(dir_path_list) - dir_levels_up])
    return path.join(desired_dir, file_name.replace('/', sep))


def join_path(path_segments: list) -> str:
    """
    Construct a full file path by concatenating path segments
    and deliniating them by a '/'.

    Parameters
    ---
    path_segments: list
        A list of strings to be joined.

    Returns
    ---
    str
        The concatenated file path.
    """
    return sep.join(path_segments)